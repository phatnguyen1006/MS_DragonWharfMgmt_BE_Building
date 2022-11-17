const mongoose = require('mongoose');

const faceSchema = new mongoose.Schema(
    {
        blockID: {
            type: String,
        },
        nodes: {
            type: [String],
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const FaceModel = mongoose.model('Face', faceSchema, 'face');

module.exports = FaceModel;