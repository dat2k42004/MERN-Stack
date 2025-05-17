const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {AddPromotion, UpdatePromotion, DeletePromotion, GetAllPromotion} = require("../controllers/promotionControl");
// add a new promotion

router.post("/add-promotion", authMiddleware, AddPromotion);


router.get("/get-all-promotions", GetAllPromotion);


router.post("/update-promotion", authMiddleware, UpdatePromotion);

router.post("/delete-promotion", authMiddleware, DeletePromotion);


module.exports = router;