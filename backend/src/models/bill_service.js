const mongoose = require("mongoose");

const bill_serviceSchema = new mongoose.Schema({
     bill_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "bills",
     },
     service_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "services",
     },
     quantity: {
          type: Number,
          required: true,
     }
});

module.exports = mongoose.model("bill_service", bill_serviceSchema);