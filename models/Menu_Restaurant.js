const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    item_name:{
        type:String,
        required:true,
    },
    item_price:{
        type:Number,
        required:true,
    }, 
    item_description:{
        type:String,
        required:true,
    },
    item_ingredients:{
        type:String,
        required:true,
    },
    food_availability:{
        type:String, 
        enum:['Available','Not Available'], 
        default:'Available'
    },
    food_category:{
        type:String, 
        enum:['jain','Regular','Both'], 
        default:'Both'
    },
    food_itemImg: {
        type:String,
    },
})

menuSchema.pre('find',function(next){
    this.populate('restaurant_id')
    next()
})

module.exports = mongoose.model('menu_restaurant',menuSchema)