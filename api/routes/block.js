const express = require('express');
const blockController = require('../controller/block');
const router = express.Router();

router.get('/block/:blockId', blockController.fetchBlock);
router.get('/transaction/:transactionHash', blockController.fetchTransaction);

module.exports = router;