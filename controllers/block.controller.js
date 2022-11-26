const NodeService = require('../services/node.service')
const FaceService = require('../services/face.service')
const BlockService = require("../services/block.service");

const BuildingModel = require("../models/building.model");
const BlockModel = require("../models/block.model");
const FaceModel = require("../models/face.model");
const NodeModel = require("../models/node.model");

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

    let listFaceId = []
    let listFaceCoordinates = geoJson.features[0].geometry.coordinates

    for (let faceCoordinates of listFaceCoordinates) {
        let listNodeId = []
        for (let nodeCoordinates of faceCoordinates[0]) {
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
        listFaceId.push(savedFace._id)
    }

    // let face = {
    //     nodes: listNodeId
    // }
    // const savedFace = await FaceService.saveFace(face)

    let block = {
        // face_id: savedFace._id,
        faces: listFaceId,
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

async function deleteBlock(req, res, next) {
    let blockName = req.body.blockName;

    //Check Building đã tồn tại hay chưa
    // const building = await BuildingModel.findOne({building_name: req.body.building_name})
    // if (!building) {
    //     return res.status(200).json({ message: 'BUILDING KHÔNG TỒN TẠI!!! VUI LÒNG TẠO BUILDING!!!' });
    // }

    //Check Block đã tồn tại hay chưa
    const existBlock = await BlockModel.findOne({ blockName: blockName })
    if (!existBlock) {
        return res.status(200).json({ message: 'BLOCK KHÔNG TỒN TẠI!!!' });
    }

    for (let faceId of existBlock.faces){
        const deletedFace = await FaceModel.findByIdAndDelete({ _id: faceId })
        const deletedNode = await NodeModel.deleteMany({ _id: deletedFace.nodes })
    }
    const deletedBlock = await BlockModel.findByIdAndDelete({ _id: existBlock._id })

    return res.status(200).json({ message: "XÓA BLOCK THÀNH CÔNG!!!" });
}

async function updateBlock(req, res, next) {
    let geoJson = req.body.geoJson;
    let renderer = req.body.renderer;

    //Check Building đã tồn tại hay chưa
    // const building = await BuildingModel.findOne({building_name: req.body.building_name})
    // if (!building) {
    //     return res.status(200).json({ message: 'BUILDING KHÔNG TỒN TẠI!!! VUI LÒNG TẠO BUILDING!!!' });
    // }

    //Check Block đã tồn tại hay chưa
    const existBlock = await BlockModel.findOne({ blockName: geoJson?.features[0]?.properties?.Name })
    if (!existBlock) {
        return res.status(200).json({ message: 'BLOCK KHÔNG TỒN TẠI!!!' });
    }

    for (let faceId of existBlock.faces){
        const deletedFace = await FaceModel.findByIdAndDelete({ _id: faceId })
        const deletedNode = await NodeModel.deleteMany({ _id: deletedFace.nodes })
    }
    const deletedBlock = await BlockModel.findByIdAndDelete({ _id: existBlock._id })

    let listFaceId = []
    let listFaceCoordinates = geoJson.features[0].geometry.coordinates

    for (let faceCoordinates of listFaceCoordinates) {
        let listNodeId = []
        for (let nodeCoordinates of faceCoordinates[0]) {
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
        listFaceId.push(savedFace._id)
    }

    let block = {
        // face_id: savedFace._id,
        faces: listFaceId,
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

    return res.status(200).json({ message: "UPDATE BLOCK THÀNH CÔNG!!!", data: updatedBuilding });
}

async function getBlock(req, res, next) {
    let building_name = req.body.building_name;
    let block_name = req.body.block_name;

    //Check Building đã tồn tại hay chưa
    const building = await BuildingModel.findOne({building_name: building_name})
    if (!building) {
        return res.status(200).json({ message: 'BUILDING KHÔNG TỒN TẠI!!! VUI LÒNG THỬ LẠI!!!' });
    }

    let query = {
        _id: building.blocks
    }

    if (block_name){
        query.blockName = block_name
    }

    let listBlock = await BlockModel.find(query).select('-_id -createdAt -updatedAt -__v').populate({
        path : 'faces',
        select: 'nodes',
        populate : {
          path : 'nodes',
          select: 'x y z',
        }
    }).lean()

    for (let block of listBlock) {
        let coordinates = []
        for (let face of block.faces) {
            let listNodeCoordinate = []
            for (let node of face.nodes) {
                let coordinate = [node.x, node.y, node.z]
                listNodeCoordinate.push(coordinate)
            }
            coordinates.push([listNodeCoordinate])
        }
        block.coordinates = coordinates
        delete block.faces
    }

    return res.status(200).json({ message: "GET BLOCK THÀNH CÔNG!!!", data: listBlock });
}

// async function migrateBlockData(req, res, next) {
//     let listBlock = await BlockModel.find().lean()
    
//     let listNewBlock = []
//     for (let block of listBlock){
//         let newBlock = { ...block } 

//         newBlock.faces = [ block.face_id ]

//         // console.log("block face_id   ", newBlock.face_id)
//         delete newBlock.face_id
//         listNewBlock.push(newBlock)
//         // block.save()
//     }
//     console.log("listNewBlock  ", listNewBlock)

//     await BlockModel.deleteMany()
//     await BlockModel.insertMany(listNewBlock)

//     return res.status(200).json({ message: "DONE!!!" });
// }

module.exports = {
    handleBlock,
    updateBlock,
    deleteBlock,
    getBlock
}