const mongoose = require('mongoose');

const blockPLSchema = new mongoose.Schema(
    {
        face_id: {
            type: String,
        },
        color: {
            type: String,
        },
        blockName: {
            type: String,
        },
        polygons: {
            type: [String],
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const BlockPLModel = mongoose.model('BlockPL', blockPLSchema, 'blockPL');

module.exports = BlockPLModel;