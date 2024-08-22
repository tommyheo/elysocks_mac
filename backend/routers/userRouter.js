const express = require('express');
const router = express.Router();
const userRouter = require('../controllers/userController');

// ----------------- Routers -----------------
router.post('/check-username', userRouter.checkUsername);
router.post('/register', userRouter.register);

module.exports = router;
