const mongoose = require("mongoose");

const servicesCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  date: {
    type: Date,
    default: new Date.now()
  }
});

module.exports = mongoose.model("ServiceCategory", servicesCategorySchema);
