const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  // We need to add the details of the User as well , here we will keep the reference for the user 
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   
  // },
  jobId:{
    type:String,
  },
  jobStatus:{
    type:String,
    enum:['Upcoming','Completed']
  },
  jobType:{
    type:String,
    enum:['Repairing','Inspection']
  },
  customerName:{
    type:String
  },
  customerAddress:{
    type:String
  },
  customerPhone:{
    type:String
  },
  customerEmail:{
    type:String
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    
  },
  time_start: {
    type: Number,
    
  },
  time_end: {
    type: Number,
    
  },
  date: {
    type: Date,
    
  },
  labourRates: {
    type: Number,
    default: 0
  },
  customerShowingCost: {
    type: Number,
  },
  completion_steps: {
    // This is for the Overall completion and also verified from the Customer Side
    overall_completion: {
      status_technician: {
        type: Boolean,
        defualt: false
      },
      status_customer: {
        type: Boolean,
        defualt: false
      },
      rating: {
        type: Number,
        defualt: 3
      }
    },
    job_modyfying_ability_to_customer: {
      type: Boolean,
    },
    job_modified_status: {
      type: Boolean,
    },
    customer_payment_status: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending'
    },
    technician_payment_release_status: {
      released:{
        type:Boolean,
        default : false
      },
      amount:{
        type:Number,
        required:true,
        default:false
      }
    }

  }
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
