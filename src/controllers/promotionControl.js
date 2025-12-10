const Promotion = require("../models/promotionModel");

const AddPromotion = async (req, res) => {
     try {
          const newPromotion = new Promotion(req.body);
          if (await Promotion.findOne({ name: newPromotion.name, type: newPromotion.type, rate: newPromotion.rate })) {
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
}

const GetAllPromotion = async (req, res) => {
     try {
          const promotions = await Promotion.find().sort({ rate: -1 });
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
}

const UpdatePromotion = async (req, res) => {
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
}

const DeletePromotion = async (req, res) => {
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
}

module.exports = {
     AddPromotion,
     UpdatePromotion,
     DeletePromotion,
     GetAllPromotion,
}