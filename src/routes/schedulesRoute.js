const router = require("express").Router();
const { GetAllSchedule, AddSchedule, UpdateSchedule, DeleteSchedule } = require("../controllers/scheduleControl");
const { requiredAdmin, requiredUser } = require("../middlewares/authMiddleware");

router.get("/", GetAllSchedule);

router.post("/", requiredAdmin, AddSchedule);

router.put("/:id", requiredAdmin, UpdateSchedule);

router.delete("/:id", requiredAdmin, DeleteSchedule);


module.exports = router;