const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.post('/create_accounts', adminController.create_accounts);
router.post('/read_accounts', adminController.read_accounts);
router.post('/update_accounts', adminController.update_accounts);
router.post('/delete_accounts', adminController.delete_accounts);

router.post('/read_all_items', adminController.read_all_items);

module.exports = router;
