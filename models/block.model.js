const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema(
    {
        face_id: {
            type: String,
        },
        height: {
            type: mongoose.Schema.Types.Decimal128,
        },
        color: {
            type: String,
        },
        blockName: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const BlockModel = mongoose.model('Block', blockSchema, 'block');

module.exports = BlockModel;