const router = require("express").Router();
// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const { Register, Login, GetCurrentUser, UpdateUser, DeleteUser, GetAllUser, ChangePassword } = require("../controllers/userControl");

// register new user

router.post('/register', Register);

router.post("/login", Login);


//get user details by id
router.get("/get-current-user", authMiddleware, GetCurrentUser);

router.post("/update-user", UpdateUser);

router.post("/delete-user", DeleteUser);

router.get("/get-all-users", authMiddleware, GetAllUser);
router.post("/change-password", ChangePassword);

module.exports = router;