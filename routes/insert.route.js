const express = require("express");
const { handleLogger, handleConfirmLogger } = require("../controllers/logger.controller");
const { handleBlock, updateBlock, deleteBlock, getBlock, migrateBlockData } = require("../controllers/block.controller");
const router = express.Router();

router.post('/', handleBlock);

router.post('/confirm', handleConfirmLogger);

module.exports = router;