//import mongoose to create mongoose model
const mongoose = require('mongoose');

//create Schema
const ContactSchema = new mongoose.Schema({
    contact_name: {
        type: String,
        character: 150, 
    },
    contact_email: {
        type: String,
        character: 150,
        required: true
    },
    contact_message: {
        type: String,
        character: 500,
        required: true
    },
    contact_guest_id: {
        type: String,
        character: 50,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    }, 
}, { collection: 'contactus' })

//export this Schema

module.exports = mongoose.model('contactuss', ContactSchema);