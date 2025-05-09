const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     address: {
          type: String,
          required: true,
     },
     founder: {
          type: String,
          required: true,
     },
     phone: {
          type: String,
          required: true,
     },
     star: {
          type: Number,
          required: true,
     }
}, {timestamps: true});

module.exports = mongoose.model("cinemas", cinemaSchema);