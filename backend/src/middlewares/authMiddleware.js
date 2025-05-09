const jwt = require("jsonwebtoken");
require("dotenv").config(); // Đảm bảo biến môi trường được nạp

module.exports = function (req, res, next) {
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
