const Block = require("../models/block.model");

async function saveBlock(block) {

    try {
        const blockUnit = new Block(block);
        const savedBlock = await blockUnit.save();

        if (savedBlock) console.log("Logs: save BLOCK successful!");

        else console.log("Logs: save BLOCK failed!");

        return savedBlock;
    } catch (error) {
        console.log(error.message);
        throw (error.message);
    }
}

module.exports = {
    saveBlock,
}