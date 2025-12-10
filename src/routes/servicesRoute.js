const router = require("express").Router();
const {AddService, DeleteService, UpdateService, GetAllService} = require("../controllers/serviceControl");
const authMiddleware = require("../middlewares/authMiddleware");

// add a new service

router.post("/add-service", authMiddleware, AddService);


router.get("/get-all-services", GetAllService);


router.post("/update-service", authMiddleware, UpdateService);

router.post("/delete-service", authMiddleware, DeleteService);


module.exports = router;