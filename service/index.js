require("@dotenvx/dotenvx").config();

console.log("====> SNOWFLAKE_ACCOUNT: " + process.env.SNOWFLAKE_ACCOUNT);

const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");
const Chance = require("chance");
const snowflake = require("snowflake-sdk");

// let isSNFReady = false;

const chance = Chance();

const randomEmail = () => `${chance.first()}.${chance.last()}@doordash.com`;

const app = express();

app.use(express.static(path.join(__dirname, "../ui-app/build")));

const port = process.env.PORT || 8000;

//// Use CORS middleware with specific settings
//app.use(cors({
//    origin: ['https://unity.doordash.com/', 'https://2e15-150-129-168-79.ngrok-free.app'], // Allow these origins to access
//    methods: ['GET', 'POST'], // Allow only these methods
//    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
//    credentials: true, // Allow cookies to be sent with requests
//}));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3001", "https://localhost:3001"], // Allow these origins to access
    methods: ["GET", "POST"], // Allow only these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
    credentials: true, // Allow cookies to be sent with requests
  })
);
//
//app.use((req, res, next) => {
//    res.setHeader("Content-Security-Policy", "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *");
//    next();
//});

// Define a route

const data_domain_list_file_path = "./database/data-domain-list.json";
const query_template_list_file_path = "./database/query-templates-list.json";
const datamart_list_file_path = "./database/datamart-list.json";
const business_model = "./database/business-model.json";
const data_express_saved_model_file_path =
  "./database/data-express-saved-model.json";

app.get("/data-domain-list", (req, res) => {
  const rawData = fs.readFileSync(data_domain_list_file_path, "utf8");
  return res.json(JSON.parse(rawData));
});

app.get("/query-templates-list", (req, res) => {
  const rawData = fs.readFileSync(query_template_list_file_path, "utf8");
  return res.json(JSON.parse(rawData));
});

// Endpoint to get datamarts for a specific domain
app.get("/datamart-list/:domain", (req, res) => {
  const domain = req.params.domain;
  const rawData = fs.readFileSync(datamart_list_file_path, "utf8");
  const data = JSON.parse(rawData);

  if (data[domain]) {
    res.json({
      domain: domain,
      datamarts: data[domain],
    });
  } else {
    res.status(404).json({
      error: "Domain not found",
    });
  }
});

// Endpoint to get business model for a specific domain and datamart
app.get("/business-model/:domain/:datamart", (req, res) => {
  const domain = req.params.domain;
  const datamart = req.params.datamart;
  const rawData = fs.readFileSync(business_model, "utf8");
  const json_key = domain + "-" + datamart;
  const data = JSON.parse(rawData);

  required_business_model = {};
  data["business_model"].forEach((item) => {
    if (json_key in item) {
      required_business_model = item[json_key];
    }
  });

  if (data["business_model"]) {
    res.json({
      domain: domain,
      datamart: datamart,
      business_model: required_business_model,
    });
  } else {
    res.status(404).json({
      error: "Business model for given Domain, Datamart not found",
    });
  }
});

// Endpoint to save the business model to database
app.post("/data-express-model", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  const newData = req.body; // Get the JSON data from the request body
  // Define the path to the JSON file
  const filePath = data_express_saved_model_file_path;
  console.log("new Data" + newData);
  // Read the current content of the JSON file
  fs.readFile(filePath, "utf8", (err, fileContent) => {
    if (err) {
      console.error("Error reading file", err);
      return res.status(500).send("Internal Server Error");
    }

    // Parse the existing JSON content
    let jsonData;
    try {
      jsonData = JSON.parse(fileContent);
    } catch (parseErr) {
      console.error("Error parsing JSON", parseErr);
      return res.status(500).send("Internal Server Error");
    }

    console.log("post parsing");

    // Ensure the data_express_model is an array
    if (!Array.isArray(jsonData.data_express_model)) {
      jsonData.data_express_model = [];
    }

    newData.createdAt = new Date().toISOString();
    newData.createdBy = randomEmail();
    // Add the new data to the data_express_model array
    jsonData.data_express_model.push(newData);

    // Write the updated JSON back to the file
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to file", writeErr);
        return res.status(500).send("Internal Server Error");
      }
      res.send("Data successfully added to file");
    });
  });
});

// Endpoint to save the business model to database
app.get("/data-express-model/name-list", (req, res) => {
  const rawData = fs.readFileSync(data_express_saved_model_file_path, "utf8");
  const data = JSON.parse(rawData);
  data_express_model_list = data["data_express_model"];

  // Map over the jsonDataList to extract names
  const namesList = data_express_model_list.map((item) => ({
    name: item.name,
    createdAt: item.createdAt,
    createdBy: item.createdBy || randomEmail(),
  }));
  // Return the list of names as JSON
  res.json(namesList);
});

app.get("/data-express-model/execute-query", (req, res) => {
  console.log("====>", req.query.id);
  console.log("====> SNOWFLAKE_USERNAME", process.env.SNOWFLAKE_USERNAME);
  console.log("====>", process.env.SNOWFLAKE_PASSWORD);
  console.log("====>", req.query.id);

  // Create a Snowflake connection
  const snowflakeConnection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    role: process.env.SNOWFLAKE_ROLE,
  });

  let sqlFileName = "";

  switch (req.query.id) {
    case "demo_financials_report_example_1":
      sqlFileName = "./sqls/select-example-1.sql";
      break;
    case "demo_financial_dasher_example_2":
      sqlFileName = "./sqls/select-example-2.sql";
      break;
    case "demo_dasher_cost_example_3":
      sqlFileName = "./sqls/select-example-3.sql";
      break;
    default:
      sqlFileName = "";
  }

  if (sqlFileName === "") {
    return res.status(400).json({
      success: false,
    });
  }

  let sqlText = fs.readFileSync(sqlFileName).toString();

  // const query_json = req.body; // Get the JSON data from the request body
  // build the query
  // query = get_query(query_json);

  // Connect to Snowflake
  snowflakeConnection.connect((err, conn) => {
    if (err) {
      console.error("Unable to connect to Snowflake:", err.message);
    } else {
      console.log("Successfully connected to Snowflake.");

      // Execute the query
      snowflakeConnection.execute({
        sqlText: sqlText,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error("Failed to execute query:", err.message);
          } else {
            console.log("Query executed successfully.");
            console.log("Rows:", rows);

            res.json({
              resultset: rows,
            });
          }

          // Close the connection
          snowflakeConnection.destroy((err) => {
            if (err) {
              console.error("Error closing connection:", err.message);
            } else {
              console.log("Connection closed.");
            }
          });
        },
      });
    }
  });
});

// Endpoint to save the business model to database
app.get("/data-express-model/:model_name", (req, res) => {
  const model_name = req.params.model_name;
  const rawData = fs.readFileSync(data_express_saved_model_file_path, "utf8");
  const data = JSON.parse(rawData);
  data_express_model_list = data["data_express_model"];
  console.log(data_express_model_list);
  if (data_express_model_list) {
    const data_express_model_required = data_express_model_list.find(
      (item) => item.name === model_name
    );
    res.json({
      data_express_model: data_express_model_required,
    });
  } else {
    res.status(404).json({
      error: "Data Express Model not found",
    });
  }
});

// Endpoint to execute query

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
