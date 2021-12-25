const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.post('/accounts', adminController.accounts);
router.post('/items', adminController.items);

module.exports = router;
