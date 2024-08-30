const User = require('../models/userSchema');

const logout = async (req, res) => {
    const { username } = req.body;

    try {
        const result = await User.findByIdAndUpdate(
            { username: username },
            { $set: { refreshToken: null } },
            { new: true }
        );

        if (result) {
            res.status(200).json({ message: '로그아웃이 완료되었습니다.', ok: false });
        } else {
            res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
    } catch (err) {
        console.log('로그아웃 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = logout;
