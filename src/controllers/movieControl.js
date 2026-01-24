const Movie = require("../models/movieModel");
const Schedule = require("../models/scheduleModel");

const AddMovie = async (req, res) => {
     try {
          const fileName = req.file ? req.file.filename : null;
          console.log("file: ", req.file);

          const movieData = {
               ...req.body,
          };

          // Convert string to boolean for active field
          if (movieData.active) {
               movieData.active = movieData.active === 'true' || movieData.active === true;
          }

          if (fileName) {
               movieData.poster = "/uploads/movies/" + fileName;
          }

          const newMovie = new Movie(movieData);
          console.log("newMovie: ", newMovie);
          if (await Movie.findOne({ title: newMovie.title, author: newMovie.author, releaseDate: newMovie.releaseDate, duration: newMovie.duration, genre: newMovie.genre })) {
               res.status(400).send({
                    success: false,
                    message: "This movie has already existed!",
               });
               return;
          }
          await newMovie.save();
          res.status(200).send({
               success: true,
               message: "Movie added successfully!",
          });
     } catch (error) {
          console.error("Error saving movie:", error);
          res.status(500).send({
               success: false,
               message: error.message,
          });
     }
};

const GetAllMovie = async (req, res) => {
     try {
          const movies = await Movie.find().sort({ releaseDate: -1 });
          // console.log(movies);
          res.status(200).send({
               success: true,
               message: "Movies fetched successfully!",
               data: movies,
          })
     } catch (error) {
          res.status(500).send({
               success: false,
               message: error.message,
          })
     }
}

const UpdateMovie = async (req, res) => {
     try {
          await Movie.findByIdAndUpdate(req.body._id, req.body);
          res.status(200).send({
               success: true,
               message: "Movie has updated successfully!",
          })
     } catch (error) {
          res.status(500).send({
               success: false,
               message: error.message,
          })
     }
}


const DeleteMovie = async (req, res) => {
     try {
          const schedule = await Schedule.findOne({ movie_id: req.body._id });
          if (schedule) {
               res.status(400).send({
                    success: false,
                    message: "Movie also has schedule. Can't delete!",
               })
               return 0;
          }
          await Movie.findByIdAndDelete(req.body._id);
          res.status(200).send({
               success: true,
               message: "Movie has deleted successfully!",
          })
     } catch (error) {
          res.status(500).send({
               success: false,
               message: error.message,
          })
     }
}



module.exports = {
     AddMovie,
     UpdateMovie,
     GetAllMovie,
     DeleteMovie,
}