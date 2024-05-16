const mongoose = require('mongoose');


const updateUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    phone: {
        type: Number,
        required : true
    },
    email : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    },
})

module.exports = updateUserSchema;


