const NodeService = require('../services/node.service')
const FaceService = require('../services/face.service')
const BlockService = require("../services/block.service");

const BuildingModel = require("../models/building.model");
const BlockModel = require("../models/block.model");
const FaceModel = require("../models/face.model");
const NodeModel = require("../models/node.model");

const BlockPlModel = require("../models/blockPL.model");
const PolygonModel = require("../models/polygon.model");

async function handleBlock(req, res, next) {
    try {
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
    } catch (err) {
        return res.status(506).json({ message: "THÊM BLOCK KHÔNG THÀNH CÔNG!!!", err: err.toString() });
    }
}

async function deleteBlock(req, res, next) {
    try{
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
        const updatedBuilding = await BuildingModel.findOneAndUpdate(
            { building_name: "Dragon Wharf" },
            { $pull: {blocks: existBlock._id.toString()}},
            { new: true }
        )
        const deletedBlock = await BlockModel.findByIdAndDelete({ _id: existBlock._id })

        return res.status(200).json({ message: "XÓA BLOCK THÀNH CÔNG!!!" });
    } catch (err) {
        return res.status(506).json({ message: "XÓA BLOCK KHÔNG THÀNH CÔNG!!!", err });
    }
}

async function updateBlock(req, res, next) {
    try {
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
    } catch (err) {
        return res.status(200).json({ message: "UPDATE BLOCK KHÔNG THÀNH CÔNG!!!", err });
    }
}

async function getBlock(req, res, next) {
    try {
        //Check Building đã tồn tại hay chưa
        const building = await BuildingModel.findOne({building_name: "Dragon Wharf"})
        if (!building) {
            return res.status(200).json({ message: 'BUILDING KHÔNG TỒN TẠI!!! VUI LÒNG THỬ LẠI!!!' });
        }

        let listBlock = await BlockModel.find({ _id: building.blocks }).select('-_id -createdAt -updatedAt -__v').populate({
            path : 'faces',
            select: 'nodes',
            populate : {
            path : 'nodes',
            select: 'x y z',
            }
        }).lean()

        let listBlockPl = await BlockPlModel.find({ _id: building.blocks_pl }).select('-_id -createdAt -updatedAt -__v').populate({
            path : 'polygons',
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

        for (let blockPl of listBlockPl) {
            let coordinates = []
            for (let polygon of blockPl.polygons) {
                let listNodeCoordinate = []
                for (let node of polygon.nodes) {
                    let coordinate = [node.x, node.y, node.z]
                    listNodeCoordinate.push(coordinate)
                }
                coordinates.push([listNodeCoordinate])
            }
            blockPl.coordinates = coordinates
            blockPl.blockName = blockPl.blockPlName
            delete blockPl.polygons
            delete blockPl.blockPlName
        }

        const finalListBlock = listBlock.concat(listBlockPl)

        return res.status(200).json({ message: "GET BLOCK THÀNH CÔNG!!!", length: finalListBlock.length, data: finalListBlock });
    } catch (err) {
        console.log(err)
        return res.status(506).json({ message: "GET BLOCK KHÔNG THÀNH CÔNG!!!", err });
    }
}

async function migrateBlockData(req, res, next) {
    let listBlock = await BlockModel.find().lean()
    let listUpdateBlockId = []
    let listNewBlock = []
    for (let block of listBlock){
        if (block.face_id){
            let newBlock = { ...block } 

            newBlock.faces = [ block.face_id ]
    
            // console.log("block face_id   ", newBlock.face_id)
            delete newBlock.face_id
            listNewBlock.push(newBlock)
            listUpdateBlockId.push(newBlock._id)
        }
        // block.save()
    }
    console.log("listNewBlock  ", listNewBlock)

    await BlockModel.deleteMany({_id: {$in: listUpdateBlockId}})
    await BlockModel.insertMany(listNewBlock)

    return res.status(200).json({ message: "DONE!!!" });
}

async function updateBlockColor(req, res, next) {
    try {
        let listBlock = await BlockModel.find(
                {
                    $and: [
                        {blockName: {$regex: "Vom "}},
                        // {blockName: {$regex: "Extra"}},
                    ]
                }
            ).lean()

        let listUpdateBlockId = []
        let listNewBlock = []
        for (let block of listBlock){
            let newBlock = { ...block } 

            newBlock.color = "#C2C59C"
            newBlock.height = 0.01

            listNewBlock.push(newBlock)
            listUpdateBlockId.push(newBlock._id)
            // block.save()
        }
        console.log("listNewBlock  ", listNewBlock)

        await BlockModel.deleteMany({_id: {$in: listUpdateBlockId}})
        await BlockModel.insertMany(listNewBlock)

        return res.status(200).json({ message: "DONE!!!", data: listBlock});

    } catch (err) {
        return res.status(506).json({ message: "GET BLOCK KHÔNG THÀNH CÔNG!!!", err });
    }
}

async function updateBlockPl(req, res, next) {
    try {
        //==================tach blocks va blockPl=========================

        // let listBlock = await BlockModel.find(
        //         {
        //             "faces.1": { "$exists": true }
        //         }
        //     ).lean()

        // let listFaceId = []
        // let listBlockId = []

        // let listBlockPl = []
        // for (let block of listBlock){
        //     listFaceId = listFaceId.concat(block.faces)
        //     listBlockId.push(block._id)
        //     let blockPL = {
        //         color: block.color,
        //         blockPlName: block.blockName,
        //         polygons: block.faces,
        //         description: '',
        //     }
        //     listBlockPl.push(blockPL)
        // }

        // let listFace = await FaceModel.find(
        //     {
        //         _id: listFaceId
        //     }
        // ).lean()

        // await BlockPlModel.insertMany(listBlockPl)
        // await PolygonModel.insertMany(listFace)

        // await BlockModel.deleteMany({ _id: listBlockId })
        // await FaceModel.deleteMany({ _id: listFaceId })

        //==================tach blocks va blockPl=========================

        //==================Caajp nhaajt building=========================

        // let listBlockPl = await BlockPlModel.find().lean()

        // let listBlockPlId = []
        // for (let blockPl of listBlockPl){
        //     listBlockPlId.push(blockPl._id)
        // }

        // await BuildingModel.updateOne(
        //     {
        //         building_name: "Dragon Wharf"
        //     },
        //     {
        //         $pullAll: { blocks: listBlockPlId },
        //         $push: { blocks_pl: listBlockPlId }
        //     }
        // )

        //==================Caajp nhaajt building=========================

        const building = await BuildingModel.findOne({ building_name: "Dragon Wharf" })

        return res.status(200).json({ message: "DONE!!!", length: building.blocks_pl.length, data: building });

    } catch (err) {
        console.log(err.toString())
        return res.status(506).json({ message: "GET BLOCK KHÔNG THÀNH CÔNG!!!", err });
    }
}

module.exports = {
    handleBlock,
    updateBlock,
    deleteBlock,
    getBlock,
    migrateBlockData,
    updateBlockColor,
    updateBlockPl
}