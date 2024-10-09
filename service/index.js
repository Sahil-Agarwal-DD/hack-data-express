const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.static(path.join(__dirname, "ui-app/build")));

const port = process.env.PORT || 8000;

//// Use CORS middleware with specific settings
//app.use(cors({
//    origin: ['https://unity.doordash.com/', 'https://2e15-150-129-168-79.ngrok-free.app'], // Allow these origins to access
//    methods: ['GET', 'POST'], // Allow only these methods
//    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
//    credentials: true, // Allow cookies to be sent with requests
//}));
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
const datamart_list_file_path = "./database/datamart-list.json";

app.get("/data-domain-list", (req, res) => {
  const rawData = fs.readFileSync(data_domain_list_file_path, "utf8");
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

// Endpoint to resolve date for a given query
app.get("/querybook/:sql", (req, res) => {
  const sql = req.params.sql;
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python', ['./querybook/query_transformer.py', "date", sql]);
  pythonProcess.stdout.on('data', (data) => {
  const result = data.toString().trim();
  res.send({ result });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
