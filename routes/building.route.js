const express = require("express");
const router = express.Router();
const BuildingController = require('../controllers/building.controller')

router.post('/create', BuildingController.createBuilding);

module.exports = router;