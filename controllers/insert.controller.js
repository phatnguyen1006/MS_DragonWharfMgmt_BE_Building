const NodeService = require('../services/node.service')
const FaceService = require('../services/face.service')
const BlockService = require("../services/block.service");

const BuildingModel = require("../models/building.model");


async function handleBlock(req, res, next) {
    let geoJson = req.body.geoJson;
    let rerender = req.body.rerender;

    //Check Building đã tồn tại hay chưa
    const building = await BuildingModel.findOne({building_name: req.body.building_name})
    if (!building) {
        return res.status(200).json({ message: 'BUILDING KHÔNG TỒN TẠI!!! VUI LÒNG TẠO BUILDING!!!' });
    }

    let listNodeId = []
    let listNodeCoordinates = geoJson.features[0].geometry.coordinates[0][0]

    for (let nodeCoordinates of listNodeCoordinates) {
        console.log('nodeCoordinates  ', nodeCoordinates)
        const node = {
            x: nodeCoordinates[0],
            y: nodeCoordinates[1],
            z: nodeCoordinates[2]
        }
        const savedNode = await NodeService.saveNode(node)
        listNodeId.push(savedNode._id)
    }

    let face = {
        nodes: listNodeId
    }
    const savedFace = await FaceService.saveFace(face)

    let block = {
        face_id: savedFace._id,
        height: rerender?.symbol?.symbolLayers[0]?.size,
        color: rerender?.symbol?.symbolLayers[0]?.material?.color,
        blockName: geoJson?.features?.properties?.Name
    }
    const savedBlock = await BlockService.saveBlock(block)

    const updatedBuilding = await BuildingModel.findByIdAndUpdate(
        { 
            _id: building._id 
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