const bcrypt = require('bcrypt');
const jwt = require('./jwt-util');
const User = require('../models/userSchema');

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(400).json({ message: '사용자를 찾을 수 없습니다.', ok: false });
    }
    try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const accessToken = jwt.sign(user);
            const refreshToken = jwt.refresh();

            await User.findOneAndUpdate(
                { username: user.username },
                { refreshToken: refreshToken },
                { upsert: true, new: true }
            );

            res.json({
                message: '로그인에 성공하였습니다.',
                ok: true,
                data: {
                    accessToken,
                    refreshToken,
                    role: user.role,
                },
            });
        } else {
            res.status(400).json({ message: '비밀번호가 일치하지 않습니다.', ok: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버에 오류가 발생했습니다.' });
    }
};

module.exports = login;
