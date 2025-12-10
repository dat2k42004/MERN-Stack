const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
console.log("MONGO_URL:", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);;

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("MomgoDB connection successful");
});

connection.on("error", (err) => {
    console.log("MongoDB connection failed");
})