const router = require("express").Router();
const Movie = require("../models/movieModel");
const Schedule = require("../models/scheduleModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a new movie

router.post("/add-movie", authMiddleware, async(req, res) => {
     try {
          const newMovie = new Movie(req.body);
          if (await Movie.findOne({title: newMovie.title, author: newMovie.author, releaseDate: newMovie.releaseDate, duration: newMovie.duration, genre: newMovie.genre})) {
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
});


router.get("/get-all-movies", async (req, res) => {
     try {
          const movies = await Movie.find().sort({createAt: -1});
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
});


router.post("/update-movie", authMiddleware, async (req, res) => {
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
});

router.post("/delete-movie", authMiddleware, async (req, res) => {
     try {
          const schedule = await Schedule.findOne({movie_id: req.body._id});
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
})


module.exports = router;