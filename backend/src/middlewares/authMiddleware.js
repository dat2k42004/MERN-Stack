const jwt = require("jsonwebtoken");
require("dotenv").config(); // Đảm bảo biến môi trường được nạp
const User = require("../models/userModel");

const requiredAdmin = async (req, res, next) => {
     try {
          const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith("Bearer ")) {
               return res.status(401).send({
                    success: false,
                    message: "Authorization header missing or invalid"
               }
               )
          }
          const token = authHeader.split(" ")[1];
          const decoded = jwt.verify(token, process.env.jwt_secret);
          console.log("decoded: ", decoded);
          const user = await User.findById(decoded.userId);
          console.log(user);
          if (!user.isAdmin) {
               return res.status(403).send({
                    success: false,
                    message: "Access denied. Admins only."
               })
          }

          req.userId = decoded.userId;
          next();
     }
     catch (err) {
          res.status(401).send({
               success: false,
               message: "Invalid token!",
          })
     }
}
const requiredUser = (req, res, next) => {
     try {
          const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith("Bearer ")) {
               return res
                    .status(401)
                    .send({ success: false, message: "Authorization header missing or invalid" });
          }

          const token = authHeader.split(" ")[1];
          const decoded = jwt.verify(token, process.env.jwt_secret);

          req.userId = decoded.userId;
          next();
     } catch (error) {
          res.status(401).send({ success: false, message: "Invalid token!" });
     }
};

module.exports = {
     requiredUser,
     requiredAdmin
}
