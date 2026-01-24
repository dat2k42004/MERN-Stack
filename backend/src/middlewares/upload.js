const multer = require("multer");
const fs = require("fs");
const path = require("path");


const upload = (folder) => {
     const uploadPath = path.join(__dirname, "../../", "uploads", folder);

     if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
     }

     const storage = multer.diskStorage({
          destination: (req, file, cb) => {
               cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
               const filename = Date.now() + "_" + file.originalname;
               cb(null, filename);
          }
     })

     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

     const fileFilter = (req, file, cb) => {
          if (allowedTypes.includes(file.mimetype)) {
               cb(null, true);
          }
          else {
               cb(new Error("Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed."), false);
          }
     }

     return multer({
          storage,
          fileFilter,
          limits: { fileSize: 10 * 1024 * 1024 }
     });
}

module.exports = upload;