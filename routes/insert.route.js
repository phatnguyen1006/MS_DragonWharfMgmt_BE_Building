const express = require("express");
const { handleLogger, handleConfirmLogger } = require("../controllers/logger.controller");
const { handleBlock, updateBlock, deleteBlock } = require("../controllers/block.controller");
const router = express.Router();

router.post('/', handleBlock);
router.post('/update', updateBlock);
router.post('/delete', deleteBlock);
router.post('/confirm', migrateBlockData);

module.exports = router;