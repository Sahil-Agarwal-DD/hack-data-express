const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8000;

//// Use CORS middleware with specific settings
//app.use(cors({
//    origin: ['https://unity.doordash.com/', 'https://2e15-150-129-168-79.ngrok-free.app'], // Allow these origins to access
//    methods: ['GET', 'POST'], // Allow only these methods
//    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
//    credentials: true, // Allow cookies to be sent with requests
//}));
//
//app.use((req, res, next) => {
//    res.setHeader("Content-Security-Policy", "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *");
//    next();
//});

// Define a route

const data_domain_list_file_path = './database/data-domain-list.json';
const datamart_list_file_path = './database/datamart-list.json';


app.get('/data-domain-list', (req, res) => {
    const rawData = fs.readFileSync(data_domain_list_file_path, 'utf8');
    return res.json(JSON.parse(rawData));
});

// Endpoint to get datamarts for a specific domain
app.get('/datamart-list/:domain', (req, res) => {
    const domain = req.params.domain;
    const rawData = fs.readFileSync(datamart_list_file_path, 'utf8');
    const data = JSON.parse(rawData);

    if (data[domain]) {
        res.json({
            domain: domain,
            datamarts: data[domain]
        });
    } else {
        res.status(404).json({
            error: "Domain not found"
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});