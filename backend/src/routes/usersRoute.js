const router = require("express").Router();
// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { requiredAdmin, requiredUser } = require("../middlewares/authMiddleware")

const { Register, Login, GetCurrentUser, UpdateUser, DeleteUser, GetAllUser, ChangePassword } = require("../controllers/userControl");

// register new user

router.post('/register', Register);

router.post("/login", Login);


//get user details by id
router.get("/get-current-user", requiredUser, GetCurrentUser);

router.post("/update-user", requiredUser, UpdateUser);

router.post("/delete-user", requiredUser, DeleteUser);

router.get("/get-all-users", requiredAdmin, GetAllUser);
router.post("/change-password", requiredUser, ChangePassword);

module.exports = router;