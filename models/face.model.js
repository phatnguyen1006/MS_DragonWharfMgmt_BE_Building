const mongoose = require('mongoose');
const node = require('../models/node.model')

const faceSchema = new mongoose.Schema(
    {
        blockID: {
            type: String,
        },
        nodes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Node'
            }
        ],
        description: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
);

const FaceModel = mongoose.model('Face', faceSchema, 'face');

module.exports = FaceModel;