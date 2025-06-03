const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     type: {
          type: String,
          required: true,
     },
     price: {
          type: Number,
          required: true,
     },
     active: {
          type: Boolean,
          required: true,
          default: true,
     }
});


module.exports = mongoose.model("services", serviceSchema);