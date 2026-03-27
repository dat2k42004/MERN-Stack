const router = require("express").Router();
// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const { requiredAdmin, requiredUser } = require("../middlewares/authMiddleware")

const { Register, Login, GetCurrentUser, UpdateUser, DeleteUser, GetAllUser, ChangePassword, LoginGoogle } = require("../controllers/userControl");

// register new user

router.post('/register', Register);

router.post("/login", Login);

router.post("/login-google", LoginGoogle);


//get user details by id
router.get("/get-current-user", requiredUser, GetCurrentUser);

router.put("/:id", requiredUser, UpdateUser);

router.delete("/:id", requiredUser, DeleteUser);

router.get("/", requiredAdmin, GetAllUser);
router.put("/change-password", requiredUser, ChangePassword);

module.exports = router;