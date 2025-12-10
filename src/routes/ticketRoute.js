const router = require("express").Router();
const {GetTicket} = require("../controllers/ticketControl");


router.post("/get-ticket", GetTicket);

module.exports = router;