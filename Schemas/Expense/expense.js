const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    amount: {
        type: Number,
        required : true
    },
})

module.exports = expenseSchema;