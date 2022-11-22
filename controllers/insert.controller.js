const NodeService = require('../services/node.service')
const FaceService = require('../services/face.service')
const BlockService = require("../services/block.service");

const BuildingModel = require("../models/building.model");
const BlockModel = require("../models/block.model");

async function handleBlock(req, res, next) {
    let geoJson = req.body.geoJson;
    let renderer = req.body.renderer;

    //Check Building đã tồn tại hay chưa
    // const building = await BuildingModel.findOne({building_name: req.body.building_name})
    // if (!building) {
    //     return res.status(200).json({ message: 'BUILDING KHÔNG TỒN TẠI!!! VUI LÒNG TẠO BUILDING!!!' });
    // }

    //Check Block đã tồn tại hay chưa
    const existBlock = await BlockModel.findOne({ blockName: geoJson?.features[0]?.properties?.Name })
    if (existBlock) {
        return res.status(200).json({ message: 'BLOCK ĐÃ TỒN TẠI!!!' });
    }

    let listNodeId = []
    let listFaceCoordinates = geoJson.features[0].geometry.coordinates[0]

    for (let faceCoordinates of listFaceCoordinates) {
        for (let nodeCoordinates of faceCoordinates) {
            const node = {
                x: nodeCoordinates[0],
                y: nodeCoordinates[1],
                z: nodeCoordinates[2]
            }
            const savedNode = await NodeService.saveNode(node)
            listNodeId.push(savedNode._id)
        }
    }

    let face = {
        nodes: listNodeId
    }
    const savedFace = await FaceService.saveFace(face)

    let block = {
        face_id: savedFace._id,
        height: renderer?.symbol?.symbolLayers[0]?.size,
        color: renderer?.symbol?.symbolLayers[0]?.material?.color,
        blockName: geoJson?.features[0]?.properties?.Name
    }
    const savedBlock = await BlockService.saveBlock(block)

    const updatedBuilding = await BuildingModel.findOneAndUpdate(
        { 
            building_name: 'Dragon Wharf' 
        },
        {
            $push: { blocks: savedBlock._id }
        },
        {
            new: true
        }
    )

    return res.status(200).json({ message: "THÊM BLOCK THÀNH CÔNG!!!", data: updatedBuilding });
}

module.exports = {
    handleBlock,
}