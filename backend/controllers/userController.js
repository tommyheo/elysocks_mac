const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

// ------------ 아이디 중복확인 ------------
exports.checkUsername = async (req, res) => {
    try {
        const username = req.body.username;
        const userExist = await User.findOne({ username: username });
        if (userExist) {
            res.json({ message: '이미 사용하고 있는 아이디입니다.', possible: false });
        } else {
            res.json({ message: '사용 가능한 아이디입니다.', possible: true });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버가 처리하지 못했습니다.' });
    }
};

// ------------ 회원가입 ------------
exports.register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            role: req.body.role,
            username: req.body.username,
            password: hashPassword,
            name: req.body.name,
            birth: req.body.birth,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
        });
        await user.save();
        res.status(201).json({ message: '회원가입이 완료되었습니다.', register: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: '서버 이상으로 회원가입에 실패하였습니다.',
            register: false,
        });
    }
};
