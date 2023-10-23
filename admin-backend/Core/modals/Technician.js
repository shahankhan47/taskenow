// Most crucial one

// models/Installer.js
const mongoose = require('mongoose');


const technicainSchema = new mongoose.Schema({
    // The unique Id for the technician
    taskNow_unique_id: {
        type: String,
        required: false
    },
    sequence_number:{
        type:Number,
        required:false
    },
    user_profile_completed:{
        type: Boolean,
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
    miles_distance: {
        type: Number,
        required: false
    },
    profileImage: {
        type: String,
        required: false
    },
    yearsOfExperience: {
        type: Number,
    },
    description: {
        type: String,
    },
    licenseNumber: {
        type: String,
        required: false
    },
    licenseExpirationDate: {
        type: Date,
        required: false
    },
    licenseCertified:{
        type: Boolean,
        required: false
    },
    
    ratingsAndReviews: {
        type: Number,
        defualt: 3
    },
    dateOfBirth: {
        type: Date,
    },
    Number_of_bookings: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    AccountNumber: {type: String},
    routingNumber: {type: String},
    ssn: {type: String},
    //we need to update this thing to add all the sections for the Stripe account , and this data should be very accurate
    stripePaymentDetails: {
        id: String,
        object: String,
        business_type: String,
        charges_enabled: Boolean,
        country: String,
        created: Number,
        default_currency: String,
        email: String,
        external_accounts: {
            data: [
                {
                    id: String,
                    object: String,
                    account_holder_name: String,
                    account_holder_type: String,
                    account_type: String,
                    bank_name: String,
                    country: String,
                    currency: String,
                    default_for_currency: Boolean,
                    fingerprint: String,
                    last4: String,
                    routing_number: String,
                    status: String
                }
            ]
        },
        individual: {
            id: String,
            object: String,
            account: String,
            address: {
                city: String,
                country: String,
                line1: String,
                line2: String,
                postal_code: String,
                state: String
            },
            created: Number,
            dob: {
                day: String,
                month: String,
                year: String
            },
            first_name: String,
            last_name: String,
            relationship: {
                percent_ownership: String,
                title: String
            }
        },
        payouts_enabled: Boolean
    }
});
const Technician = mongoose.model('Technician', technicainSchema);
module.exports = Technician;