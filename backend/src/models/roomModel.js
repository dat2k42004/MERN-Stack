const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     type: {
          type: String,
          required: true,
     },
     quantity: {
          type: Number,
          required: true,
     },
     cinema_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "cinemas",
     }
}, {timestamps: true});

module.exports = mongoose.model("rooms", roomSchema);