const { model, Schema } = require("mongoose");

const purchaseProductSchema = new Schema(
    {
        invoice_number: {
            type: String,
        },
        invoice_total: {
            type: Number,
        },
        product: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        unit_price: {
            type: String,
        },
        total_price: {
            type: String,
        },
        status: {
            type: String,
        },
        discount: {
            type: Number,
        },
        paid_amount: {
            type: Number,
        },
        payment_method: {
            type: String,
        },
        purchase_by: {
            type: String,
        },
        payment_note: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const PurchaseProduct = model("PurchaseProduct", purchaseProductSchema);

module.exports = PurchaseProduct
