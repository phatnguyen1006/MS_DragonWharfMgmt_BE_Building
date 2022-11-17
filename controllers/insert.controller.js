const BlockService = require("../services/logger.service");

async function handleBlock(req, res, next) {
    let geoJson = req.body.geoJson;
    let rerender = req.body.rerender;

    // let buildingData = {
    //     buildingName: geoJson.features[0].properties['Name'],
    // }

    // let nodes = {
    //     x: req.body.geoJson.features[0].geometry.coordinates[0][0][0],
    //     y: req.body.geoJson.features[0].geometry.coordinates[0][0][1],
    //     z: req.body.geoJson.features[0].geometry.coordinates[0][0][2],
    // }

    // let faceData = {
    //     nodes: req.body.geoJson.features[0].geometry.coordinates[0][0],
    // }

    let nodes = req.body.geoJson.features[0].geometry.coordinates[0][0];
    console.log("node ", nodes);
    let block_name = geoJson.features[0].properties["Name"];
    let block_height = req.body.rerender.symbol.symbolLayers[0].size;
    let color = req.body.rerender.symbol.symbolLayers[0].material.color;

    return res.status(200).json({ json: { id: "1", nodes: nodes, block_name: block_name, block_height: block_height, color: color }, });
}

module.exports = {
    handleBlock,
}