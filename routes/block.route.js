const express = require("express");
const { handleLogger, handleConfirmLogger } = require("../controllers/logger.controller");
const { handleBlock, updateBlock, deleteBlock, getBlock, migrateBlockData, updateBlockColor, updateBlockPl } = require("../controllers/block.controller");
const router = express.Router();

// router.post('/', handleBlock);
router.post('/update', updateBlock);
router.post('/delete', deleteBlock);
// router.post('/migrate', migrateBlockData);
router.post('/updateBlockColor', updateBlockColor);
router.post('/updateBlockPl', updateBlockPl);
router.get('/getBlock', getBlock)

router.post('/confirm', handleConfirmLogger);

module.exports = router;