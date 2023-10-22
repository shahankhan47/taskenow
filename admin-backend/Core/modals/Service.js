const mongoose = require('mongoose');
const mongodb = require('mongodb');
const serviceSchmea = new mongoose.Schema({
    taskNow_unique_id: {type: String},
    sequence_number: {type: Number},
    service_name :{
        type:  String,
        required : true
    },
    service_code : {
        type : mongodb.ObjectId,
        required : true
    },
    category:{
        type:String,
        required:false
    },
    est_price:{
        type:String,
        required:false
    }
})

const Services = mongoose.model('Service',serviceSchmea);
module.exports = Services;