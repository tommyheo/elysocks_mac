const User = require('../models/userSchema');

// ------------ 전체 회원 조회  ------------
exports.members = async (req, res) => {
    try {
        //MongoDB 프로젝션을 사용하여 비밀번호를 제외한 정보들을 응답으로 보냄
        const memberList = await User.find({}, { password: 0, refreshToken: 0 });
        res.status(200).json({ memberList: memberList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

exports.person = async (req, res) => {
    const { member } = req.body;
    try {
        const person = await User.findById({ _id: member }, { refreshToken: 0, password: 0 });
        res.status(200).json({ person });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

exports.deletePerson = async (req, res) => {
    try {
        const { member } = req.body;
        if (!member) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        await User.findByIdAndDelete({ _id: member });
        res.status(200).json({ message: '회원이 성공적으로 삭제되었습니다.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 오류' });
    }
};
