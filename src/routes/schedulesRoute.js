const router = require("express").Router();
const { GetAllSchedule, AddSchedule, UpdateSchedule, DeleteSchedule } = require("../controllers/scheduleControl");
const { requiredAdmin, requiredUser } = require("../middlewares/authMiddleware");

router.get("/get-all-schedules", GetAllSchedule);

router.post("/add-schedule", requiredAdmin, AddSchedule);

router.post("/update-schedule", requiredAdmin, UpdateSchedule);

router.post("/delete-schedule", requiredAdmin, DeleteSchedule);


module.exports = router;