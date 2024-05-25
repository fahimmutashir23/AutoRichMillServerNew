const mongoose = require("mongoose");

const productListSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ProductList", productListSchema);
