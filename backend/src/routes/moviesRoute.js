const router = require("express").Router();
const { AddMovie, UpdateMovie, DeleteMovie, GetAllMovie } = require("../controllers/movieControl");
const { requiredUser, requiredAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// add a new movie
router.post("/add-movie", requiredAdmin, upload("movies").single("poster"), AddMovie);

// get all movies
router.get("/get-all-movies", GetAllMovie);

// update a movie
router.post("/update-movie", requiredAdmin, UpdateMovie);

// delete a movie
router.post("/delete-movie", requiredAdmin, DeleteMovie);

module.exports = router;