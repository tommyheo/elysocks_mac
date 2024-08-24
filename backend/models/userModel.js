const mongoose = require('mongoose');

const userModel = new mongoose.Schema(
    {
        role: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        address: {
            type: String,
            require: true,
        },
        refreshToken: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userModel);

module.exports = User;
