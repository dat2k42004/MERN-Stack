const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
     title: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
     duration: {
          type: Number,
          required: true,
     },
     author: {
          type: String,
          required: true,
     },
     releaseDate: {
          type: Date,
          required: true,
     },
     genre: {
          type: String,
          required: true,
     },
     poster: {
          type: String,
          required: true,
     },
     trailer: {
          type: String,
          required: true,
     }
}, {timestamps: true});

module.exports = mongoose.model("movies", movieSchema);