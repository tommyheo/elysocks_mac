const mongoose = require('mongoose');

const tokenModel = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30일 후 만료
});

const Token = mongoose.model('Token', tokenModel);
module.exports = Token;
