const router = require("express").Router();
const {AddService, DeleteService, UpdateService, GetAllService} = require("../controllers/serviceControl");
const {requiredAdmin, requiredUser} = require("../middlewares/authMiddleware");

// add a new service

router.post("/add-service", requiredAdmin, AddService);


router.get("/get-all-services", GetAllService);


router.post("/update-service", requiredAdmin, UpdateService);

router.post("/delete-service", requiredAdmin, DeleteService);


module.exports = router;