const mongoose = require('mongoose');

const polygonSchema = new mongoose.Schema(
    {
        bleft_id: {
            type: String,
        },
        bright_id: {
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

const PolygonModel = mongoose.model('Polygon', polygonSchema, 'polygon');

module.exports = PolygonModel;