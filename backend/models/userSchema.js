const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['user', 'admin'],
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
        birth: {
            type: Date,
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
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
