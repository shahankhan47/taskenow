const mongoose = require('mongoose');
const serviceSchmea = new mongoose.Schema({
    service_name :{
        type:  String,
        required : true
    },
    service_code : {
        type : String,
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