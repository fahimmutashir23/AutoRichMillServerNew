const mongoose = require("mongoose");

const invoiceTermsSchema = new mongoose.Schema({
  invoiceTitle: {
    type: String,
    required: true,
  },
  invoiceTerms: {
    type: String,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model("InvoiceTerms", invoiceTermsSchema);
