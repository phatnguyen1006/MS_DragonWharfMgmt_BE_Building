const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema(
    {
        // face_id: {
        //     type: mongoose.Types.ObjectId,
        // },
        height: {
            type: mongoose.Schema.Types.Decimal128,
        },
        color: {
            type: String,
        },
        blockName: {
            type: String,
        },
        faces: {
            type: [mongoose.Types.ObjectId],
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const BlockModel = mongoose.model('Block', blockSchema, 'block');

module.exports = BlockModel;