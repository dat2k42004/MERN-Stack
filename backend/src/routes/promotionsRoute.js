const router = require("express").Router();
const Promotion = require("../models/promotionModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add a new promotion

router.post("/add-promotion", authMiddleware, async(req, res) => {
     try {
          const newPromotion = new Promotion(req.body);
          if (await Promotion.findOne({name: newPromotion.name, type: newPromotion.type, rate: newPromotion.rate})) {
               res.send({
                    success: false,
                    message: "This promotion has already existed!",
               });
          }
          else {
               await newPromotion.save();
               res.send({
                    success: true,
                    message: "Promotion added successfully!",
               });
          }
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          });
     }
});


router.get("/get-all-promotions", async (req, res) => {
     try {
          const promotions = await Promotion.find().sort({rate: -1});
          res.send({
               success: true,
               message: "Promotions fetched successfully!",
               data: promotions,
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});


router.post("/update-promotion", authMiddleware, async (req, res) => {
     try {
          await Promotion.findByIdAndUpdate(req.body._id, req.body);
          res.send({
               success: true,
               message: "Promotion has updated successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
});

router.post("/delete-promotion", authMiddleware, async (req, res) => {
     try {
          await Promotion.findByIdAndDelete(req.body._id);
          res.send({
               success: true,
               message: "Promotion has deleted successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
})


module.exports = router;