const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController.js');

router.get('/read_item/:account_id/:item_code', clientController.read_item);

module.exports = router;
