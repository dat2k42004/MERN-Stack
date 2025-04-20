const express = require("express");
const cors = require("cors");

const app = express();
const POST = 8080;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(POST, () => {
    console.log(`Server is running in http://localhost:${POST}`);
});


