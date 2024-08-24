const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel');

// ----------------- Generate JWT Tokens -----------------
const generateTokens = (userId, username, role) => {
    const accessToken = jwt.sign({ userId, username, role }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ userId, username, role }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d',
    });

    return { accessToken, refreshToken };
};

// ----------------- Login -----------------
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user)
            return res
                .status(400)
                .json({ message: '사용자를 찾을 수 없습니다.', isLoggedIn: false });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json({ message: '비밀번호가 틀렸습니다.', isLoggedIn: false });

        const { accessToken, refreshToken } = generateTokens(user._id, user.username, user.role);

        // ----------------- RefreshToken 저장 -----------------
        await Token.create({ userId: user._id, token: refreshToken });

        // ----------------- refreshToken을 HTTP-only 쿠키로 설정 -----------------
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'dev',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // ----------------- res 응답 -----------------
        res.json({
            accessToken,
            user: { id: user._id, username: user.username, role: user.role },
            isLoggedIn: true,
            message: `로그인이 완료되었습니다. 환영합니다. ${user.username}님!`,
        });
    } catch (err) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.', isLoggedIn: false });
    }
};

// ----------------- Logout -----------------
exports.logout = async (req, res) => {
    try {
        // ----------------- RefreshToken 제거 -----------------
        await Token.findOneAndDelete({ userId: req.body.id });

        // ----------------- RefreshToken 쿠키 제거 -----------------
        res.clearCookie('refreshToken');

        res.json({ message: '로그아웃이 완료되었습니다.' });
    } catch (err) {
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

// ----------------- Check Username -----------------
exports.checkUsername = async (req, res) => {
    try {
        const isExist = await User.findOne({ username: req.body.username });
        if (isExist) {
            res.status(200).json({ message: '아이디가 존재합니다. 다른 아이디를 사용해주세요.' });
        } else {
            res.status(200).json({ message: '사용 가능한 아이디입니다.' });
        }
    } catch (err) {
        console.log(err);
    }
};

// ----------------- Register -----------------
exports.register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            role: req.body.role,
        });

        user.save();

        res.status(200).json({
            register: true,
            message: `회원가입에 성공하였습니다. 반갑습니다 ${req.body.username}님!`,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            register: false,
            message: '회원가입에 실패했습니다',
        });
    }
};
