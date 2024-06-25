const mongoose = require("mongoose");

const paymentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
}, {timestamps: true});

module.exports = mongoose.model("Payment", paymentTypeSchema);
