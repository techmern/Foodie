const mongoose = require('mongoose')

const citychema = new mongoose.Schema({
    cityname:{
        type:String,
    },
    city_postalcode:{
        type:String, 
    },
    citystatus:{
        type:String,
        enum:['Available','Not Available'], 
        default:'Available' 
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('city',citychema)