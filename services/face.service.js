const Face = require("../models/face.model");

async function saveFace(face) {

    try {
        const faceUnit = new Face(face);
        const savedFace = await faceUnit.save();

        if (savedFace) console.log("Logs: save FACE successful!");

        else console.log("Logs: save FACE failed!");

        return savedFace;
    } catch (error) {
        console.log(error.message);
        throw (error.message);
    }
}

module.exports = {
    saveFace,
}