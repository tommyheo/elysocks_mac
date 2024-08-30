const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/check-username', userController.checkUsername);
router.post('/register', userController.register);

module.exports = router;
