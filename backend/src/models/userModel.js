const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId;
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("users", userSchema);