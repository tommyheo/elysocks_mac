const User = require('../models/userModel');

exports.users = async (req, res) => {
    try {
        const userList = await User.find();
        res.status(200).json({ users: userList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '리스트를 불러오는데 실패하였습니다.' });
    }
};
