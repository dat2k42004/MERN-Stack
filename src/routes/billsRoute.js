const router = require("express").Router();

const { AddBill, UpdateBill, DeleteBill, GetBill, GetAllBill } = require("../controllers/billControl");
const { requiredAdmin, requiredUser } = require("../middlewares/authMiddleware");



// add bill
router.post("/", requiredUser, AddBill);

// delete bill
router.delete("/:id", requiredUser, DeleteBill);

// update bill
router.put("/:id", requiredUser, UpdateBill);

// get bill
router.get("/user/:id", requiredUser, GetBill);

// get all bills
router.get("/", requiredAdmin, GetAllBill);



module.exports = router;