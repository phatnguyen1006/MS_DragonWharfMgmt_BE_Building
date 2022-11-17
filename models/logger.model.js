const mongoose = require('mongoose');

const loggerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        payload: {
            type: String,
        },
        description: {
            type: String,
            default: "",
        },
        is_error: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const LoggerSchema = mongoose.model('Logger', loggerSchema, 'logger');

module.exports = LoggerSchema;