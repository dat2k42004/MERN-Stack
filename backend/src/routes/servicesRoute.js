const router = require("express").Router();
const {AddService, DeleteService, UpdateService, GetAllService} = require("../controllers/serviceControl");
const {requiredAdmin, requiredUser} = require("../middlewares/authMiddleware");

// add a new service

router.post("/", requiredAdmin, AddService);


router.get("/", GetAllService);


router.put("/:id", requiredAdmin, UpdateService);

router.delete("/:id", requiredAdmin, DeleteService);


module.exports = router;