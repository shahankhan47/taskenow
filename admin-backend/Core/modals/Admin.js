// Most crucial one

// models/Installer.js
const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    // The unique Id for the technician
    taskNow_unique_id: {
        type: String,
        required: false
    },
    sequence_number: {
        type: Number,
        required: false
    },
    // The First name
    firstName: {
        type: String,
        required: false
    },
    // the last name
    lastName: {
        type: String,
        required: false
    },
    // main Email , should be unique
    email: {
        type: String,
        required: false,
        unique: true
    },
    // the state from US ( to be selected from the Dropdown )
    state: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    addressLine1: {
        type: String,
        required: false
    },
    addressLine2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    zip: {
        type: String,
        required: false
    },

    description: {
        type: String,
    },
    access: [{
        type: String,
        required: false,
    }],
    heirarchy:{
        type:String,
        required:false
    },
    

});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;