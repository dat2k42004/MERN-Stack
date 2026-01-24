const router = require("express").Router();
const { requiredUser, requiredAdmin } = require("../middlewares/authMiddleware");
const { AddPromotion, UpdatePromotion, DeletePromotion, GetAllPromotion } = require("../controllers/promotionControl");
// add a new promotion

router.post("/add-promotion", requiredAdmin, AddPromotion);

router.get("/get-all-promotions", GetAllPromotion);


router.post("/update-promotion", requiredAdmin, UpdatePromotion);

router.post("/delete-promotion", requiredAdmin, DeletePromotion);


module.exports = router;