const mongoose = require("mongoose");

const paymentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Payment", paymentTypeSchema);
