const express = require("express");
const { handleLogger, handleConfirmLogger } = require("../controllers/logger.controller");
const { handleBlock } = require("../controllers/insert.controller");
const router = express.Router();

router.post('/', handleBlock);
router.post('/confirm', handleConfirmLogger);

module.exports = router;