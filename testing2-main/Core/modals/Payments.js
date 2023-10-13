const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  payment_type: {
    type: String,
    required: true,
  },
  sequence_number:{
    type: Number,
    required: true
  },
  client_secret:{
    type: String,
    required: true
  },
  payment_id: {
    type: String,
    required: true
  },
  installer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
  },
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
  date:{
    type:Date,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  Job_Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Booking"
  },
  Job_Unique_Tn_id:{
   type:String,
  }

});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;