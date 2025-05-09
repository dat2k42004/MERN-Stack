const router = require("express").Router();
const Cinema = require("../models/cinemaModel");
const Room = require("../models/roomModel");
const Seat = require("../models/seatModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a new cinema

router.post("/add-cinema", authMiddleware, async(req, res) => {
     try {
          const newCinema = new Cinema(req.body);
          if (await Cinema.findOne({name: newCinema.name})) {
               res.send({
                    success: false,
                    message: "This cinema has already existed!",
               });
          }
          else {
               await newCinema.save();
               res.send({
                    success: true,
                    message: "Cinema added successfully!",
               });
          }
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          });
     }
});


router.get("/get-all-cinemas", async (req, res) => {
     try {
          const cinemas = await Cinema.find().sort({createAt: -1});
          res.send({
               success: true,
               message: "Cinemas fetched successfully!",
               data: cinemas,
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});


router.post("/update-cinema", authMiddleware, async (req, res) => {
     try {
          await Cinema.findByIdAndUpdate(req.body._id, req.body);
          res.send({
               success: true,
               message: "Cinema has updated successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});

router.post("/delete-cinema", authMiddleware, async (req, res) => {
     try {
          const room1 = await Room.findOne({cinema_id: req.body._id});
          await Seat.deleteMany({room_id: room1._id});
          await Room.deleteMany({cinema_id: req.body._id});
          await Cinema.findByIdAndDelete(req.body._id);
          res.send({
               success: true,
               message: "Cinema has deleted successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
})


module.exports = router;