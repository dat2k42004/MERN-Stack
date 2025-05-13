const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const app = express();
const POST = process.env.PORT || 8080;

const userRoute = require("./routes/usersRoute");
const movieRoute = require("./routes/moviesRoute");
const cinemaRoute = require("./routes/cinemasRoute");
const roomRoute = require("./routes/roomsRoute");
const scheduleRoute = require("./routes/schedulesRoute");
const promotionRoute = require("./routes/promotionsRoute");
const serviceRoute = require("./routes/servicesRoute");
const ticketRoute = require("./routes/ticketRoute");
const billRoute = require("./routes/billsRoute");
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/cinemas", cinemaRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/schedules", scheduleRoute);
app.use("/api/promotions", promotionRoute);
app.use("/api/services", serviceRoute);
app.use("/api/tickets", ticketRoute);
app.use("/api/bills", billRoute);
app.listen(POST, () => {
    console.log(`Server is running in http://localhost:${POST}`);
});


