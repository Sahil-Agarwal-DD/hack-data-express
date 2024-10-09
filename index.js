const express = require('express');

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
app.get('/data-domain-list', (req, res) => {
    const dataDomainList = {
        "domain_list": [
            'consumer',
            'dashmart',
            'dasher',
            'storefront',
            'drive',
            'new verticals'
        ]
    };
    return res.json(dataDomainList);
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});