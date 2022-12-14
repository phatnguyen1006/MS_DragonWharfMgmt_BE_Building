const express = require("express");
const { handleLogger, handleConfirmLogger } = require("../controllers/logger.controller");
const { handleBlock, updateBlock, deleteBlock, getBlock, migrateBlockData } = require("../controllers/block.controller");
const router = express.Router();

// router.post('/', handleBlock);
router.post('/update', updateBlock);
router.post('/delete', deleteBlock);
router.post('/migrate', migrateBlockData);

router.get('/getBlock', getBlock)

router.post('/confirm', handleConfirmLogger);

module.exports = router;