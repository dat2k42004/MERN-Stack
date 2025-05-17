const Room = require("../models/roomModel");
const Seat = require("../models/seatModel");
const Schedule = require("../models/scheduleModel");
const Ticket = require("../models/ticketModel");

const AddRoom = async(req, res) => {
     try {
          const newRoom = new Room(req.body);
          if (await Room.findOne({name: newRoom.name, cinema_id: newRoom.cinema_id})) {
               res.send({
                    success: false,
                    message: "This room has already existed!",
               });
          }
          else {
               await newRoom.save();
               for(let i = 1; i <= newRoom.quantity; ++i) {
                    const newSeat = new Seat({seatNum: i, type: "Single", room_id: newRoom._id});
                    await newSeat.save();
               }
               res.send({
                    success: true,
                    message: "Room added successfully!",
               });
          }
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          });
     }
}

const DeleteRoom = async (req, res) => {
     try {
          const schedule = Schedule.findOne({room_id: req.body._id});
          if (schedule) {
               res.send({
                    success: false,
                    message: "Room also has schedule. Can't delete!",
               })
               return 0;
          }
          await Seat.deleteMany({room_id: req.body._id});
          await Room.findByIdAndDelete(req.body._id);
          res.send({
               success: true,
               message: "Room has deleted successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
}


const UpdateRoom = async (req, res) => {
     try {
          const res1 = await Room.findOne({_id: req.body._id});
          await Room.findByIdAndUpdate(req.body._id, req.body);
          const res2 = await Room.findOne({ _id: req.body._id });
          if (res1.quantity > res2.quantity) {
               for (let i = res2.quantity + 1; i <= res1.quantity; ++ i) {
                    const seat = await Seat.findOne({seatNum: i, room_id: req.body._id});
                    await Ticket.deleteMany({seat_id: seat._id});
                    await Seat.findOneAndDelete({seatNum: i, room_id: req.body._id});
               }
          }else if (res2.quantity > res1.quantity) {
               for(let i = res1.quantity + 1; i <= res2.quantity; ++ i) {
                    const newSeat = new Seat({ seatNum: i, type: "Single", room_id: req.body._id });
                    await newSeat.save();
               }
          }
          res.send({
               success: true,
               message: "Room has updated successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
}


const GetAllRoom = async (req, res) => {
     try {
          const Rooms = await Room.find().sort({createAt: -1});
          res.send({
               success: true,
               message: "Rooms fetched successfully!",
               data: Rooms,
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
}


module.exports = {
     AddRoom,
     DeleteRoom,
     UpdateRoom,
     GetAllRoom,
}