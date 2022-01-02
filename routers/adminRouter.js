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

router.post('/control_items', adminController.control_items);
router.post('/upload_xlsx', upload.single('uploaded'), adminController.upload_xlsx);
router.post('/update_xlsx', adminController.update_xlsx);
router.post('/cancel_update_xlsx', adminController.cancel_update_xlsx);

router.post('/generate_qrcode', adminController.generate_qrcode);

module.exports = router;
