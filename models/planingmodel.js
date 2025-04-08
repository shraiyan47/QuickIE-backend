//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const PlanningSchema = new mongoose.Schema({
    monthly_sheet_id: {
        type: String,
        required: true
    },
    plan_id: {
        type: String,
        required: true
    },
    plan_amount: {
        type: Number,
        required: true
    },
    plan_type: {
        type: String,
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
    userId: {
        type: String,
        required: true
    }
}, { collection: 'planning' })

//export this Schema

module.exports = mongoose.model('plannings', PlanningSchema);