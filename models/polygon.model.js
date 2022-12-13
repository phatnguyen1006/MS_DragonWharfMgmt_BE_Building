const mongoose = require('mongoose');

const polygonSchema = new mongoose.Schema(
    {
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

const PolygonModel = mongoose.model('Polygon', polygonSchema, 'polygon');

module.exports = PolygonModel;