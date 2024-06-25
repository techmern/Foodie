const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  
        required: true
    },
    rating: {
        type: Number,
        required: true,
       
    },
    review: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


reviewSchema.pre('find',function(next){
    this.populate('restaurantId')
    next()
})


reviewSchema.pre('find',function(next){
    this.populate('userId')
    next()
})
module.exports = mongoose.model('Restaurant_review', reviewSchema);
