const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const dbConfig = require("./src/config/dbConfig");
const router = require("./src/routes/index");
const app = express();
const POST = process.env.PORT || 8080;


app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// SSL Configuration
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(POST, () => {
    console.log(`Server is running on https://localhost:${POST}`);
});


