const mongoose = require("mongoose");
const billSchema = new mongoose.Schema({
     date: {
          type: String,
          required: true,
     },
     status: {
          type: Boolean,
          required: true,
          default: false,
     },
     totalCost: {
          type: Number,
          required: true,
          default: 0,
     },
     user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
     },
     promotion_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "promotions",
     }
});

module.exports = mongoose.model("bills", billSchema);