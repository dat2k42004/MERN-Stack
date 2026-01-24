const router = require("express").Router();

const {requiredUser, requiredAdmin} = require("../middlewares/authMiddleware");
const {AddCinema, GetAllCinema, UpdateCinema, DeleteCinema} = require("../controllers/cinemaControl");

// add a new cinema

router.post("/add-cinema", requiredAdmin, AddCinema);


router.get("/get-all-cinemas", GetAllCinema);


router.post("/update-cinema", requiredAdmin, UpdateCinema);

router.post("/delete-cinema", requiredAdmin, DeleteCinema)


module.exports = router;