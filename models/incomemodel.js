//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const IncomeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category_id: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
}, { collection: 'income' })

//export this Schema

module.exports = mongoose.model('incomes', IncomeSchema);