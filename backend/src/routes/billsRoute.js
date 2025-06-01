const router = require("express").Router();

const { AddBill, UpdateBill, DeleteBill, GetBill, GetAllBill} = require("../controllers/billControl");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/add-bill", AddBill);


router.post("/delete-bill", DeleteBill);


router.post("/update-bill", UpdateBill);


router.post("/get-bill", GetBill);


router.get("/get-all-bill", authMiddleware, GetAllBill);



module.exports = router;