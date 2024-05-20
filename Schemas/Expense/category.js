const { model, Schema } = require("mongoose");

const expenseCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},{
    versionKey: false
});

const ExpenseCategory = model("ExpenseCategory", expenseCategorySchema);

module.exports = ExpenseCategory;
