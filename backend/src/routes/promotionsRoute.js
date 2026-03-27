const router = require("express").Router();
const { requiredUser, requiredAdmin } = require("../middlewares/authMiddleware");
const { AddPromotion, UpdatePromotion, DeletePromotion, GetAllPromotion } = require("../controllers/promotionControl");
// add a new promotion

router.post("/", requiredAdmin, AddPromotion);

router.get("/", GetAllPromotion);


router.put("/:id", requiredAdmin, UpdatePromotion);

router.delete("/:id", requiredAdmin, DeletePromotion);


module.exports = router;