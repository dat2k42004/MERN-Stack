const router = require("express").Router();
const { AddMovie, UpdateMovie, DeleteMovie, GetAllMovie } = require("../controllers/movieControl");
const { requiredUser, requiredAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// add a new movie
router.post("/", requiredAdmin, upload("movies").single("poster"), AddMovie);

// get all movies
router.get("/", GetAllMovie);

// update a movie
router.put("/:id", requiredAdmin, UpdateMovie);

// delete a movie
router.delete("/:id", requiredAdmin, DeleteMovie);

module.exports = router;