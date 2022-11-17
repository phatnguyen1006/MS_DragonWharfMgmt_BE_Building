const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema(
    {
        building_name: {
            type: String,
        },
        address: {
            type: String,
        },
        description: {
            type: String,
        },
        blocks: {
            type: [String],
        },
        blocks_pl: {
            type: [String],
        },
    },
    { timestamps: true }
);

const BuildingModel = mongoose.model('Building', buildingSchema, 'building');

module.exports = BuildingModel;