const { model, Schema } = require("mongoose");

const expenseCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
},{
    versionKey: false,
    timestamps: true
});

const ExpenseCategory = model("ExpenseCategory", expenseCategorySchema);

module.exports = ExpenseCategory;
