const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");




const Register = async (req, res) => {
    try {

        //check if user already exists
        const emailExists = await User.findOne({ email: req.body.email });
        console.log(req.body.email);
        const nameExists = await User.findOne({ username: req.body.username });

        if (nameExists) {
            return res.send({
                success: false,
                message: "Username already exists",
            });
        }
        else if (emailExists) {
            return res.send({
                success: false,
                message: "An email only used for a user",
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //save the user
        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "User created successfully!",
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
}

const Login = async (req, res) => {
    try {
        //check if user exists
        const user = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.email },
            ]
        });

        if (!user) {
            return res.send({
                success: false,
                message: "User not exists",
            });
        }
        if (user && !user.active) {
            return res.send({
                success: false,
                message: "User banned",
            })
        }

        //check password is correct
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        }

        //create and assign a token 
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "1d",
        })

        res.send({
            success: true,
            message: "User logged in successfully!",
            data: token,
        });
    }
    catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

const GetCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.send({
            success: true,
            message: "User deatails fetched successfully!",
            data: user,
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
};


const UpdateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.body._id, req.body);
        res.send({
            success: true,
            message: "User has already updated!",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
}

const DeleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body._id);
        res.send({
            success: true,
            message: "User has already deleted!",
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const GetAllUser = async (req, res) => {
    try {
        const response = await User.find().sort({ createAt: -1 });
        res.send({
            success: true,
            message: "User fetched successfully!",
            data: response,
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
}

const ChangePassword = async (req, res) => {
    try {
        const user = await User.findById(req.body._id);

        if (req.body.old === req.body.new) {
            res.send({
                message: "New password need different old one!",
                success: false,
            })
            console.log("error");
            return 0;

        }

        const valid = await bcrypt.compare(
            req.body.old,
            user.password
        );

        if (!valid) {
            res.send({
                success: false,
                message: "Current password is incorrect"
            })
            console.log("hello");
            return 0;
        }
        else {
            console.log("true");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.new, salt);
        await User.updateOne({ _id: req.body._id }, { $set: { password: hashedPassword } });
        const response = await User.findById(req.body._id);

        res.send({
            success: true,
            message: "Change password successfully",
            data: response,
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    Register,
    Login,
    GetCurrentUser,
    UpdateUser,
    DeleteUser,
    GetAllUser,
    ChangePassword
}