const Ticket = require("../models/ticketModel");

const GetTicket = async (req, res) => {
     try {
          const response = await Ticket.find({ schedule_id: req.params.id }).sort({ seat: 1 });
          console.log(req.params.id);
          res.status(200).send({
               success: true,
               message: "Ticket fetch successfully!",
               data: response,
          })
     } catch (error) {
          res.status(500).send({
               success: false,
               message: error.message,
          })
     }
}


module.exports = {
     GetTicket,
}