const mongoose = require('mongoose');

const driverRatingSchema = new mongoose.Schema({
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
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver',
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


driverRatingSchema.pre('find', function (next) {
    this.populate('orderId')
    next()
})

driverRatingSchema.pre('find', function (next) {
    this.populate('userId')
    next()
})

driverRatingSchema.pre('find', function (next) {
    this.populate('driverId')
    next()
})


module.exports = mongoose.model('driver_rating', driverRatingSchema);
