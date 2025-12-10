const Movie = require("../models/movieModel");
const Schedule = require("../models/scheduleModel");

const AddMovie = async (req, res) => {
     try {
          const newMovie = new Movie(req.body);
          if (await Movie.findOne({ title: newMovie.title, author: newMovie.author, releaseDate: newMovie.releaseDate, duration: newMovie.duration, genre: newMovie.genre })) {
               res.send({
                    success: false,
                    message: "This movie has already existed!",
               });
          }
          else {
               await newMovie.save();
               res.send({
                    success: true,
                    message: "Movie added successfully!",
               });
          }
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          });
     }
};

const GetAllMovie = async (req, res) => {
     try {
          const movies = await Movie.find().sort({ releaseDate: -1 });
          // console.log(movies);
          res.send({
               success: true,
               message: "Movies fetched successfully!",
               data: movies,
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
}

const UpdateMovie = async (req, res) => {
     try {
          await Movie.findByIdAndUpdate(req.body._id, req.body);
          res.send({
               success: true,
               message: "Movie has updated successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
}


const DeleteMovie = async (req, res) => {
     try {
          const schedule = await Schedule.findOne({ movie_id: req.body._id });
          if (schedule) {
               res.send({
                    success: false,
                    message: "Movie also has schedule. Can't delete!",
               })
               return 0;
          }
          await Movie.findByIdAndDelete(req.body._id);
          res.send({
               success: true,
               message: "Movie has deleted successfully!",
          })
     } catch (error) {
          res.send({
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