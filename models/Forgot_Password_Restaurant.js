const mongoose = require('mongoose');

const ForgetPasswordrestaurantSchema = new mongoose.Schema({
   
    emailid:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,
    }     
})
module.exports = mongoose.model('forgot_Password_Restaurant', ForgetPasswordrestaurantSchema);