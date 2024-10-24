//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const IncomePlanSchema = new mongoose.Schema({
    plan_title: {
        type: String,
        required: true
    },
    plan_amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    
}, { collection: 'incomeplan' })

//export this Schema

module.exports = mongoose.model('incomeplans', IncomePlanSchema);