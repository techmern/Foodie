const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({

    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    token:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    },
})

tokenSchema.index({expiresAt:1},{expireAfterSeconds:0})


tokenSchema.pre('find',function(next){
    this.populate('restaurant_id')
    next()
})

module.exports = mongoose.model('restaurant_token',tokenSchema)