const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {AddCinema, GetAllCinema, UpdateCinema, DeleteCinema} = require("../controllers/cinemaControl");

// add a new cinema

router.post("/add-cinema", authMiddleware, AddCinema);


router.get("/get-all-cinemas", GetAllCinema);


router.post("/update-cinema", authMiddleware, UpdateCinema);

router.post("/delete-cinema", authMiddleware, DeleteCinema)


module.exports = router;