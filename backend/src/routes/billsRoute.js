const router = require("express").Router();
const Bill = require("../models/billModel");
const Service = require("../models/serviceModel");
const Promotion = require("../models/promotionModel");
const Ticket = require("../models/ticketModel");
const Bill_Service = require("../models/bill_service");
const  Schedule = require("../models/scheduleModel");
const Movie = require("../models/movieModel");
const Cinema = require("../models/cinemaModel");
const Room = require("../models/roomModel");

router.post("/add-bill", async (req, res) => {
     try {
          const {date, user, ticket, service, promotion, totalCost} = req.body;
          
          if (promotion) {
               await Promotion.updateOne({ _id: promotion._id }, {
                    $inc: {
                         number: -1
               }});
          }
          const newBill = new Bill({
               date: date,
               status: false,
               totalCost: totalCost,
               user_id: user._id,
               promotion_id: promotion ? promotion._id : null,
          });
          await newBill.save();

          
          ticket.map(async (e) => {
               await Ticket.updateOne({ _id: e }, { $set: { status: true, bill_id: newBill._id} });
          });

          service.filter(e => e.quantity > 0).map(async (e) => {
               const bill_service = new Bill_Service({
                    bill_id: newBill._id,
                    service_id: e._id,
                    quantity: e.quantity,
               })
               await bill_service.save();
          });
          res.send({
               success: true,
               message: "Booking successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});


router.post("/get-bill", async (req, res) => {
     try {
          console.log(req.body);
          const {user} = req.body;
          console.log(user);
          const bills = await Bill.find({user_id: req.body._id});
          const response = await Promise.all(bills.map(async (b) => {
               const bill_service = await Bill_Service.find({ bill_id: b._id });
               const services = await Promise.all(bill_service.map(async (e) => ({
                    service: await Service.findOne({ _id: e.service_id }),
                    quantity: e.quantity,
               })));
               const promotion = await Promotion.findOne({ _id: b.promotion_id });
               const ticket = await Ticket.find({ bill_id: b._id });
               const schedule = await Schedule.findOne({ _id: ticket[0]?.schedule_id });
               const movie = await Movie.findOne({ _id: schedule?.movie_id });
               const cinema = await Cinema.findOne({ _id: schedule?.cinema_id });
               const room = await Room.findOne({_id: schedule?.room_id});
               return {
                    bill: b,
                    ticket: ticket,
                    schedule: schedule,
                    movie: movie,
                    cinema: cinema,
                    room: room,
                    service: services,
                    promotion: promotion,
               };
          }));
           

          res.send({
               success: true,
               message: "Bill fetch successfully",
               data: response,
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
})


module.exports = router;