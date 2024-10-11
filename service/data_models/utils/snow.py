import logging
import time
import string
import random
import snowflake.connector as snow_connector
from snowflake.connector import DictCursor
from utils import get_snowflake_config

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("debug.log"),
        logging.StreamHandler()
    ]
)

SESSION_LOCK_TIMEOUT = 0  # value (in seconds) of 0 indicates timeout immediately if lock isn't available
TEST_WAREHOUSE = "SERVICE_ETLXPRESS_TEST"

class Connector(object):
    def __init__(self, connection, profile, job_id=None):
        self.connection = connection
        self.profile = profile
        self.job_id = job_id

    def cursor(self, *args, **kwargs):
        if self.profile == "snowflake-prod":
            return self.connection.cursor()
        return Cursor(self, *args, **kwargs)

    def set_isolation_level(self, commit):
        self.connection.set_isolation_level(commit)

    def close(self):
        self.connection.close()

    def commit(self):
        self.connection.commit()

    def rollback(self):
        self.connection.rollback()

    def __setattr__(self, name, value):
        if name == "connection" or name == "profile" or name == "job_id":
            self.__dict__[name] = value
        else:
            setattr(self.connection, name, value)

    def __enter__(self):
        return self.connection.__enter__()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connection.__exit__(exc_type, exc_val, exc_tb)

class Cursor(object):
    def __getattr__(self, attr):
        return getattr(self.cursor, attr)

    def __init__(self, connector, *args, **kwargs):
        self.connection = connector.connection
        self.cursor = self.connection.cursor(*args, **kwargs)
        self.profile = connector.profile
        self.job_id = connector.job_id
        if not self.job_id:
            rand = "".join(random.choice(string.digits) for i in range(20))
            self.job_id = "%s_%s" % (int(time.time()), rand)

    def execute(self, sql, args=None):
        try:
            result = self.cursor.execute(sql, args)
            self.rowcount = self.cursor.rowcount
            self.description = self.cursor.description
            return result
        except Exception as e:
            # if the cursor has snowflake query id, log it for debug
            if hasattr(self.cursor, "sfqid"):
                logging.error("query id: {}".format(self.cursor.sfqid))
            logging.exception(e)
            raise e

    def copy_expert(self, sql, filename, size=8192):
        self.cursor.copy_expert(sql, filename, size)

    def __enter__(self):
        return self.cursor.__enter__()

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.cursor.__exit__(exc_type, exc_val, exc_tb)

    def set_itersize(self, size):
        self.cursor.itersize = size
        self.itersize = size

    def __iter__(self):
        return self.cursor.__iter__()

    def __next__(self):
        return self.cursor.__next__()

def connect(
    profile="snowflake-prod",
    job_id=None,
    session_parameters=None,
):
    session_parameters = session_parameters or {}
    db_config = get_snowflake_config(profile)
    print("Debug - Config is {}".format(db_config))
    snowflake_warehouse = db_config["warehouse"]
    logging.info(f"Using Warehouse: {snowflake_warehouse}")
    conn = snow_connector.connect(
        user=db_config["username"],
        password=db_config["password"],
        account=db_config["account"],
        database=db_config["database"],
        schema=db_config["schema"],
        warehouse=snowflake_warehouse,
        session_parameters=session_parameters,
    )
    cur = conn.cursor()
    logging.info("Connected to Snowflake")
    try:
        cur.execute(
            "ALTER SESSION SET lock_timeout={}".format(SESSION_LOCK_TIMEOUT)
        )
        cur.execute("SHOW parameters like 'LOCK_TIMEOUT'")
        logging.info("Setting SESSION lock_timeout to: {}".format(cur.fetchone()[1]))
        cur.execute(
            "SELECT current_warehouse() || '.' || current_database() || '.' || current_schema()"
        )
        default_connection = cur.fetchone()[0]
        if not default_connection:
            # Set the active warehouse
            cur.execute("USE WAREHOUSE {}".format(TEST_WAREHOUSE))

        logging.info("Snowflake default connection: %s" % default_connection)
    finally:
        cur.close()
    connector = Connector(conn, profile, job_id)
    return connector

def execute_snowflake_sql(sqls):
    # Connector is not reused here. Wrap in with to make sure connection is closed.
    with connect() as conn:
        with conn.cursor() as cur:
            # cur.execute_async(sql)
            qid = None
            for sql in sqls:
                cur.execute(sql)
                # get the first statement query id
                if not qid:
                    qid = cur.sfqid
            # res = cur.fetchone()
            res = cur.fetchall()
            print(f"Result: {res}")
            return res, qid

def extract_table_name_by_snf_explain(sql):
    explain_sql = "explain " + sql
    table_names = set()
    with connect() as conn:
        with conn.cursor(DictCursor) as cur:
            cur.execute(explain_sql)
            for rec in cur:
                if rec.get('operation') == 'TableScan':
                    table_name = rec.get('objects')
                    print("identified table name: " + table_name)
                    table_names.add(table_name)
            return table_names

#if __name__ == "__main__":
#    execute_snowflake_sql(["SELECT STORE_ID, BUSINESS_ID, BUSINESS_NAME FROM EDW.FINANCE.DIMENSION_DELIVERIES LIMIT 10"])
    # extract_table_name_by_snf_explain("select a.TIMESTAMP from  iguazu.consumer.m_card_view as a cross join iguazu.driver.cng_tracking_client_event_dasher where a.TIMESTAMP>'2024-10-09 01:00:00';")