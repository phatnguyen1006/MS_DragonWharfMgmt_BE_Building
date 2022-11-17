const LoggerService = require("../services/logger.service");

async function handleLogger(req, res, next) {
    // console.log("Body", req.body.geoJson.features[0].properties['Building Height']);
    console.log("Body", req.body);

    // let json = {
    //     id: "1",
    //     face: req.body.geoJson.features[0].geometry.coordinates[0][0],
    // };

    const log = await LoggerService.saveLogger({
        username: req.body.username,
        payload: JSON.stringify(req.body),
    });

    console.log("log: ", log);

    next();
    // return res.status(200).json({ json: json, log: log });
}

function handleConfirmLogger(req, res, next) {
    console.log("Body", req.body);

    let confirmObject = {
        id: req.body.id,
        isError: req.body.confirm,
    };

    const json = LoggerService.confirmLogger(confirmObject);

    return res.status(200).json({ data: json });
}

module.exports = {
    handleLogger,
    handleConfirmLogger,
}