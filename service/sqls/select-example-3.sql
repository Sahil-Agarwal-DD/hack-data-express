SELECT
  dte AS "Active Date",
  SUM(gov) AS "gov",
  SUM(DASHER_BASE_PAY) AS "dasher_pay"
FROM
  proddb.public.test_agg_table_financials
WHERE
  dte >= '2024-10-01'
GROUP BY
  ALL