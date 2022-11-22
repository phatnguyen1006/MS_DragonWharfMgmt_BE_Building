const LoggerService = require("../services/logger.service");
const BuildingModel = require("../models/building.model");

async function createBuilding(req, res, next) {

    console.log("Body", req.body);

    const building = await BuildingModel.findOne({ building_name: req.body.building_name })
    if (building) {
        return res.status(200).json({ message: 'TÊN BUILDING ĐÃ TỒN TẠI!!!' });
    }

    const buildingUnit = new BuildingModel(req.body)
    const savedBuilding = await buildingUnit.save()
    
    if (savedBuilding) console.log("Logs: save BUILDING successful!");
        else console.log("Logs: save BUILDING failed!");

    return res.status(200).json({ message: 'THÀNH CÔNG!!!', data: savedBuilding });
}

module.exports = {
    createBuilding,
}