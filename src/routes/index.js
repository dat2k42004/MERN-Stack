const express = require("express");

const movieRouter = require("./moviesRoute");
const billsRouter = require("./billsRoute");
const usersRouter = require("./usersRoute");
const cinemasRouter = require("./cinemasRoute");
const promotionsRouter = require("./promotionsRoute");
const roomsRouter = require("./roomsRoute");
const servicesRouter = require("./servicesRoute");
const schedulesRouter = require('./schedulesRoute');
const ticketRouter = require("./ticketRoute");


const router = express.Router();

// user routes
router.use('/users', usersRouter);
// movie routes
router.use("/movies", movieRouter);
// cinema routes
router.use("/cinemas", cinemasRouter);
// room routes
router.use("/rooms", roomsRouter);
// promotion routes
router.use("/promotions", promotionsRouter);
// service routes
router.use("/services", servicesRouter);
// schedule routes
router.use("/schedules", schedulesRouter);
// ticket routes
router.use("/tickets", ticketRouter);
// bill routes
router.use("/bills", billsRouter);

module.exports = router;
