const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  branchPhone1: {
    type: Number,
    required: true,
  },
  branchPhone2: {
    type: Number,
    required: true,
  },
  branchInvoiceBackground: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Branch", branchSchema);
