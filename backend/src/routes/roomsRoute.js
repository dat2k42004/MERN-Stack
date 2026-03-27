const router = require("express").Router();
const {requiredUser, requiredAdmin} = require("../middlewares/authMiddleware");


const { AddRoom, UpdateRoom, DeleteRoom, GetAllRoom } = require("../controllers/roomControl");
// add a new Room

router.post("/", requiredAdmin, AddRoom);


router.get("/", GetAllRoom);


router.put("/:id", requiredAdmin, UpdateRoom);

router.delete("/:id", requiredAdmin, DeleteRoom);


module.exports = router;