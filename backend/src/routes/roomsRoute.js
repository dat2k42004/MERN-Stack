const router = require("express").Router();
const {requiredUser, requiredAdmin} = require("../middlewares/authMiddleware");


const { AddRoom, UpdateRoom, DeleteRoom, GetAllRoom } = require("../controllers/roomControl");
// add a new Room

router.post("/add-room", requiredAdmin, AddRoom);


router.get("/get-all-rooms", GetAllRoom);


router.post("/update-room", requiredAdmin, UpdateRoom);

router.post("/delete-room", requiredAdmin, DeleteRoom);


module.exports = router;