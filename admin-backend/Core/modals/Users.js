const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    taskNow_unique_id: {
        type: String,
        required: false
    },
    sequence_number: {
        type: Number,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
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
    booked_jobs: [
        {
            jobId: {
                type: String,
                required: false
            },
            jobStatus: {
                type: String,
                required: false
            }
        }
    ]
    

});
const Users = mongoose.model('User', userSchema);
module.exports = Users;