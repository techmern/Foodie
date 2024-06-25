const mongoose = require('mongoose')

const user_addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true,
    },
    user_address: {
        type: String,
        required: true,
    },

    landmark: {
        type: String,
    },
    pincode: {
        type: Number,
        required: true,
    },

    
})

user_addressSchema.pre('find',function(next){
    this.populate('userId')
    next()
})



module.exports = mongoose.model('user_address', user_addressSchema)