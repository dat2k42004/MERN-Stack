const router = require("express").Router();
const Ticket = require("../models/ticketModel");


router.post("/get-ticket", async(req, res) =>{
     try {
          const response = await Ticket.find({schedule_id: req.body._id}).sort({seat: 1});
          console.log(req.query._id);
          res.send({
               success: true, 
               message: "Ticket fetch successfully!",
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