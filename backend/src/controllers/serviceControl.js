const Service = require("../models/serviceModel");


const AddService = async (req, res) => {
     try {
          const newService = new Service(req.body);
          if (await Service.findOne({ name: newService.name, type: newService.type, price: newService.price })) {
               res.send({
                    success: false,
                    message: "This service has already existed!",
               });
          }
          else {
               await newService.save();
               res.send({
                    success: true,
                    message: "Service added successfully!",
               });
          }
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          });
     }
}


const UpdateService = async (req, res) => {
     try {
          await Service.findByIdAndUpdate(req.body._id, req.body);
          res.send({
               success: true,
               message: "Service has updated successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
}

const DeleteService = async (req, res) => {
     try {
          await Service.findByIdAndDelete(req.body._id);
          res.send({
               success: true,
               message: "Service has deleted successfully!",
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
}

const GetAllService = async (req, res) => {
     try {
          const services = await Service.find().sort({ price: 1 });
          res.send({
               success: true,
               message: "Services fetched successfully!",
               data: services,
          })
     } catch (error) {
          res.send({
               success: false,
               message: error.message,
          })
     }
}


module.exports = {
     AddService,
     GetAllService,
     DeleteService,
     UpdateService,
}