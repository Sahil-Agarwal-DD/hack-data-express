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
const business_model = "./database/business-model.json"

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

// Endpoint to get business model for a specific domain and datamart
app.get("/business-model/:domain/:datamart", (req, res) => {
    const domain = req.params.domain;
    const datamart = req.params.datamart;
    const rawData = fs.readFileSync(business_model, "utf8");
    const json_key = domain+"-"+datamart
    const data = JSON.parse(rawData);
    if (data["business_model"]) {
        res.json({
        domain: domain,
        datamart: datamart,
        business_model: data["business_model"][0][json_key],
        });
    } else {
        res.status(404).json({
        error: "Business model for given Domain, Datamart not found",
        });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
