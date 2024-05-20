const { model, Schema } = require("mongoose");

const expenseReceiptSchema = new Schema({
    expense_id: {
        type: Number,
        required: true,
        unique: true
    },
    receiver: {
        type: String,
        required: true,
    },
    expense_name: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    net_amount: {
        type: Number,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},{
    versionKey: false
});

const ExpenseReceipt = model("ExpenseReceipt", expenseReceiptSchema);

module.exports = ExpenseReceipt;
