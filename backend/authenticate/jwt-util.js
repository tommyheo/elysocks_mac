const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const secret = process.env.JWT_SECRET;

module.exports = {
    sign: (user) => {
        const payload = {
            username: user.username,
            role: user.role,
        };
        return jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: '1h',
        });
    },
    verify: (token) => {
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                ok: true,
                username: decoded.username,
                role: decoded.role,
            };
        } catch (err) {
            return {
                ok: false,
                message: err.message,
            };
        }
    },
    refresh: () => {
        return jwt.sign({}, secret, {
            algorithm: 'HS256',
            expiresIn: '14d',
        });
    },
    refreshVerify: async (token, username) => {
        try {
            const user = await User.findOne({ username: username });
            if (user && token === user.refreshToken) {
                try {
                    jwt.verify(token, secret);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
};
