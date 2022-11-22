const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema(
    {
        building_name: {
            type: String,
            unique: true 
        },
        address: {
            type: String,
        },
        description: {
            type: String,
        },
        blocks: {
            type: [mongoose.Types.ObjectId],
            default: []
        },
        blocks_pl: {
            type: [String],
            default: []
        },
    },
    { timestamps: true }
);

const BuildingModel = mongoose.model('Building', buildingSchema, 'building');

module.exports = BuildingModel;