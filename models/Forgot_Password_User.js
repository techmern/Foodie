
const mongoose = require('mongoose')

const forgot_password_userSchema = new mongoose.Schema({
    Email_Id:{
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



module.exports = mongoose.model('forgot_password_user',forgot_password_userSchema)