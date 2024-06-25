const mongoose = require('mongoose');

const orderreviewSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  
        required: true
    },
    rating: {
        type: Number,   
    },
    review: {
        type: String,
    },
    reply: {
        type: String, 
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


orderreviewSchema.pre('find',function(next){
    this.populate('orderId')
    next()
})

orderreviewSchema.pre('find',function(next){
    this.populate('userId')
    next()
})


module.exports = mongoose.model('order_rating', orderreviewSchema);
