const mongosse = require("mongoose");

const promotionSchema =  new mongosse.Schema({
     name: {
          type: String,
          required: true,
     },
     number: {
         type: Number,
         required: true, 
     },
     active: {
          type: Boolean,
          required: true,
     },
     date:{
          type: String,
          required: true
     },
     rate: {
          type: Number,
          required: true,
     }
});


module.exports = mongosse.model("promotions", promotionSchema);