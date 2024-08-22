const User = require('../models/userModel');
// ----------------- Controllers -----------------

// ----------------- Register -----------------
exports.checkUsername = async (req, res) => {
    try {
        const username = req.body.username;
        const isExist = await User.findOne({ username });
        if (isExist) {
            res.status(204).json({ mesaage: '아이디가 존재합니다' });
        } else {
            res.status(200).json({ message: '사용 가능한 아이디입니다' });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.register = async (req, res) => {
    console.log(req.body);
};
