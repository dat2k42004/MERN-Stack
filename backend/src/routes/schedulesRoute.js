const router = require("express").Router();
const Schedule = require("../models/scheduleModel");
const authmiddleware = require("../middlewares/authMiddleware");


router.get("/get-all-schedules", async (req, res) => {
     try {
          const response = await Schedule.find().sort({createAt: -1});
          res.send({
               success: true,
               message: "Schedule fetched successfully!",
               data: response,
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});

router.post("/add-schedule", authmiddleware, async (req, res) => {
     try {
          const newSchedule = new Schedule(req.body);
          await newSchedule.save();
          res.send({
               success: true,
               message: "Schedule added successfully!",
          });
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});

router.post("/update-schedule", authmiddleware, async (req, res) => {
     try {
          await Schedule.findByIdAndUpdate(req.body._id, req.body);
          res.send({
               success: true,
               message: "Schedule has updated successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});


router.post("/delete-schedule", authmiddleware, async (req, res) => {
     try {
          await Schedule.findByIdAndDelete(req.body._id);
          res.send({
               success: true, 
               message: "Schedule has already deleted!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});


module.exports = router;