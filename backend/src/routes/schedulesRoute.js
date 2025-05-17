const router = require("express").Router();
const {GetAllSchedule, AddSchedule, UpdateSchedule, DeleteSchedule} = require("../controllers/scheduleControl");
const authmiddleware = require("../middlewares/authMiddleware");





router.get("/get-all-schedules", GetAllSchedule);




router.post("/add-schedule", authmiddleware, AddSchedule);

router.post("/update-schedule", authmiddleware, UpdateSchedule);


router.post("/delete-schedule", authmiddleware, DeleteSchedule);


module.exports = router;