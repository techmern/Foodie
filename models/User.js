const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
    },
    Email_Id:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    Mob_No:{
        type:Number,
        required:true,
    },
})

module.exports = mongoose.model('user',userSchema)