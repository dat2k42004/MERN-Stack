const router = require("express").Router();
const {GetTicket} = require("../controllers/ticketControl");


router.get("/schedule/:id", GetTicket);

module.exports = router;