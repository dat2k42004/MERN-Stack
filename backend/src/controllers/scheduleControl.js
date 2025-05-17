const Schedule = require("../models/scheduleModel");
const Seat = require("../models/seatModel");
const Ticket = require("../models/ticketModel");

const GetAllSchedule = async (req, res) => {
     try {
          const response = await Schedule.find().sort({ date: 1, startTime: 1 });
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
}


const AddSchedule = async (req, res) => {
     try {
          const newSchedule = new Schedule(req.body);
          await newSchedule.save();
          // const room = Room.find({_id: newSchedule.room_id});
          const seat = await Seat.find({ room_id: newSchedule.room_id });
          for (let i = 0; i < seat.length; ++i) {
               const newTicket = new Ticket({
                    price: newSchedule.price,
                    status: false,
                    date: newSchedule.date,
                    seat_id: seat[i]._id,
                    seat: seat[i].seatNum,
                    schedule_id: newSchedule._id,
                    bill_id: null
               });
               await newTicket.save();
          }
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
}

const UpdateSchedule = async (req, res) => {
     try {
          const schedule = await Schedule.findOne({ _id: req.body._id })
          await Ticket.updateMany({ schedule_id: req.body._id }, {
               $set: {
                    price: schedule.price,
                    date: schedule.date,
                    schedule_id: schedule._id
               }
          })
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
}

const DeleteSchedule = async (req, res) => {
     try {
          await Ticket.deleteMany({ schedule_id: req.body._id });
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
}


module.exports = {
     GetAllSchedule,
     AddSchedule,
     UpdateSchedule,
     DeleteSchedule,
}