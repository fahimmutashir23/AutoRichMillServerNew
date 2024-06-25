const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  academic: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, {timestamps: true});

module.exports = mongoose.model("Provider", providerSchema);
