const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema(
  {
    x: {
      type: String,
      required: true,
    },
    y: {
      type: String,
      required: true,
    },
    z: {
      type: String,
      required: true,
    },
    description: {
      type: String,
  },
  },
  { timestamps: true }
);

const NodeModel = mongoose.model('Node', nodeSchema, 'node');

module.exports = NodeModel;