const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
     date: {
          type: String,
          required: true,
     },
     startTime: {
          type: String,
          required: true,
     },
     price: {
          type: Number,
          required:true,
     },
     cinema_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "cinemas",
     },
     room_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "rooms",
     },
     movie_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "movies",
     },
     active: {
          type: Boolean,
          required: true,
          default: true,
     }
}, {timestamps: true});


module.exports = mongoose.model("schedules", scheduleSchema);