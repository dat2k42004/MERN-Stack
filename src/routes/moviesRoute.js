const router = require("express").Router();
const {AddMovie, UpdateMovie, DeleteMovie, GetAllMovie} = require("../controllers/movieControl");
const authMiddleware = require("../middlewares/authMiddleware");

// add a new movie

router.post("/add-movie", authMiddleware, AddMovie);


router.get("/get-all-movies", GetAllMovie);


router.post("/update-movie", authMiddleware, UpdateMovie);

router.post("/delete-movie", authMiddleware, DeleteMovie);


module.exports = router;