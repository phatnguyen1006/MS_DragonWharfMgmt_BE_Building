const Logger = require("../models/logger.model");

async function saveLogger(logger) {

    try {
        const loggerUnit = new Logger(logger);
        const savedLogger = await loggerUnit.save();

        if (savedLogger) console.log("Logs: successful!");

        else console.log("Logs: failed!");

        return savedLogger;
    } catch (error) {
        console.log(error.message);
        throw (error.message);
    }
}

async function confirmLogger(confirmObject) {

    try {
        const updatedLogger = Logger.findByIdAndUpdate(confirmObject.id, { is_error: confirmObject.isError });

        if (updatedLogger) console.log("Logs: update successful!");

        else console.log("Logs: update failed!");

        return updatedLogger;
    } catch (error) {
        console.log(error.message);
        throw (error.message);
    }
}

module.exports = {
    saveLogger,
    confirmLogger,
}