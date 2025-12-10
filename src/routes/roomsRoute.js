const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");


const { AddRoom, UpdateRoom, DeleteRoom, GetAllRoom } = require("../controllers/roomControl");
// add a new Room

router.post("/add-room", authMiddleware, AddRoom);


router.get("/get-all-rooms", GetAllRoom);


router.post("/update-room", authMiddleware, UpdateRoom);

router.post("/delete-room", authMiddleware, DeleteRoom)


module.exports = router;