const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
