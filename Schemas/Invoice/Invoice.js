const { model, Schema } = require("mongoose");

const InvoiceSchema = new Schema(
  {
    invoice_id: {
      type: String,
    },
    payment_method: {
      type: String,
    },
    status: {
      type: String,
    },
    billing_branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
    },
    invoice_to: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    service_item: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    service_qty: {
      type: Number,
    },
    sub_total: {
      type: String,
    },
    discount: {
      type: String,
    },
    total_amount: {
      type: Number,
    },
    invoice_generate: {
      type: String,
    },
    payment_note: {
      type: String,
    },
    billing_note: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Invoice = model("invoice", InvoiceSchema);

module.exports = Invoice;
