const mongoose = require('mongoose');

const faceSchema = new mongoose.Schema(
    {
        blockID: {
            type: String,
        },
        nodes: {
            type: [mongoose.Types.ObjectId],
        },
        description: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
);

const FaceModel = mongoose.model('Face', faceSchema, 'face');

module.exports = FaceModel;