const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/members', adminController.members);
router.post('/person', adminController.person);
router.post('/person/delete', adminController.deletePerson);

module.exports = router;
