const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    restaurantname:{
        type:String,
        required:true,
    },
    emailid:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobno:{
        type:Number,
        required:true,
    },
    address:{
        type:String, 
    },
    city:{
        type:String, 
    },
    postalcode:{
        type:String, 
    },
    restaurantStatus:{
        type:String,
        enum:['Open','Close','Temporary Close'], 
        default:'Open' 
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('restaurants',restaurantSchema)