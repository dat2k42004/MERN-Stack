const router = require("express").Router();

const {requiredUser, requiredAdmin} = require("../middlewares/authMiddleware");
const {AddCinema, GetAllCinema, UpdateCinema, DeleteCinema} = require("../controllers/cinemaControl");

// add a new cinema

router.post("/", requiredAdmin, AddCinema);


router.get("/", GetAllCinema);


router.put("/:id", requiredAdmin, UpdateCinema);

router.delete("/:id", requiredAdmin, DeleteCinema)


module.exports = router;