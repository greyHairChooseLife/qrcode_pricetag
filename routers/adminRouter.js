const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.post('/show_accounts', adminController.show_accounts);
router.post('/register_accounts', adminController.register_accounts);
router.post('/show_items', adminController.show_items);

module.exports = router;
