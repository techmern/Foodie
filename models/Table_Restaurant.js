const mongoose = require('mongoose')

const tableSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    table_number:{
        type:String,
        required:true, 
    },
    table_capacity:{
        type:String,
        required:true, 
    },
    table_availability:{
        type:String, 
        enum:['Available','Not Available'], 
        default:'Available'
    }
    
})

tableSchema.pre('find',function(next){
    this.populate('restaurant_id')
    next()
})

module.exports = mongoose.model('table',tableSchema)