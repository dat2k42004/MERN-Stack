const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
     price: {
          type: Number,
          required: true,
     },
     status: {
          type: Boolean,
          required: true,
          default: false,
     },
     date: {
          type: String,
          required: true,
     },
     seat_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "seats",
     },
     seat: {
          type: Number,
          required: true,
     },
     schedule_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "schedules",
     },
     bill_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "bills",
          required: false,
     }
});

module.exports = mongoose.model("tickets", ticketSchema);