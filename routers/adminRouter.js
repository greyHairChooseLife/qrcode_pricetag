const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const multer = require('multer');
const upload = multer({dest: './files'});

router.post('/create_accounts', adminController.create_accounts);
router.post('/read_accounts', adminController.read_accounts);
router.post('/update_accounts', adminController.update_accounts);
router.post('/delete_accounts', adminController.delete_accounts);

router.post('/read_all_items', adminController.read_all_items);

router.post('/controll_items', adminController.controll_items);
router.post('/upload_xlsx', upload.single('uploaded'), adminController.upload_xlsx);

module.exports = router;
