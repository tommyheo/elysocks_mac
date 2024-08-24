const express = require('express');
const router = express.Router();
const adminRouter = require('../controllers/adminController');

// ----------------- Routers -----------------
router.post('/users', adminRouter.users);

module.exports = router;
