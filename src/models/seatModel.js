const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
     seatNum: {
          type: Number,
          required: true,
     },
     type: {
          type: String,
          required: true,
     },
     room_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "rooms",
     },
}, {timestamps: true});


module.exports = mongoose.model("seats", seatSchema);