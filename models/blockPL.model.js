const mongoose = require('mongoose');

const blockPLSchema = new mongoose.Schema(
    {
        color: {
            type: String,
        },
        blockPlName: {
            type: String,
        },
        polygons: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Polygon'
            }
        ],
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const BlockPLModel = mongoose.model('BlockPL', blockPLSchema, 'blockPL');

module.exports = BlockPLModel;