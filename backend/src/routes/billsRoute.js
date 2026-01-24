const router = require("express").Router();

const { AddBill, UpdateBill, DeleteBill, GetBill, GetAllBill } = require("../controllers/billControl");
const { requiredAdmin, requiredUser } = require("../middlewares/authMiddleware");



// add bill
router.post("/add-bill", requiredUser, AddBill);

// delete bill
router.post("/delete-bill", requiredUser, DeleteBill);

// update bill
router.post("/update-bill", requiredUser, UpdateBill);

// get bill
router.post("/get-bill", requiredUser, GetBill);

// get all bills
router.get("/get-all-bill", requiredAdmin, GetAllBill);



module.exports = router;