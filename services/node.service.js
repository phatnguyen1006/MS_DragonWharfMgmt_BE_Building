const Node = require("../models/node.model");

async function saveNode(node) {

    try {
        const nodeUnit = new Node(node);
        const savedNode = await nodeUnit.save();

        if (savedNode) console.log("Logs: save NODE successful!");

        else console.log("Logs: save NODE failed!");

        return savedNode;
    } catch (error) {
        console.log(error.message);
        throw (error.message);
    }
}

module.exports = {
    saveNode,
}