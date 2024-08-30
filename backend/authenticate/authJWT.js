const { verify } = require('./jwt-util');

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            ok: false,
            message: 'Authorization header missing',
        });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            ok: false,
            message: 'Invalid authorization format',
        });
    }

    const token = parts[1];
    try {
        const result = verify(token);
        if (result.ok) {
            req.username = result.username;
            req.role = result.role;
            next();
        } else {
            res.status(401).json({
                ok: false,
                message: result.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error verifying token',
        });
    }
};

module.exports = authJWT;
