const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");

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
const datamart_list_file_path = "./database/datamart-list.json";
const business_model = "./database/business-model.json";
const data_express_saved_model_file_path =
  "./database/data-express-saved-model.json";

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
  const json_key = domain + "-" + datamart;
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
  const namesList = data_express_model_list.map((item) => item.name);
  // Return the list of names as JSON
  res.json(namesList);
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
// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
