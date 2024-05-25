const { model, mongoose } = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
const Supplier = model("Supplier", supplierSchema);

module.exports = Supplier;
