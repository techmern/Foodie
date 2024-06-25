// Order.js
const mongoose = require('mongoose');
const driver = require('./Driver');

const orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    items: [{
        item_name: String,
        item_price: Number,
        quantity: Number,
        item_description: String,
        item_ingredients: [String],
        food_itemImg: String
    }],
    user_address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_address',
        required: true,
    },
    orderTotal: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now,
    },

    orderStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Prepared', 'Ready', 'Cancelled'],
        default: 'Pending',
    },
    deliveryStatus: {
        type: String,
        enum: ['Pending', 'Accept', 'On the way To Pickup', 'Pickup', 'On the way To Delivered', 'Delivered'],
        default: 'Pending',
    },

    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver',
        default: null
    },
    paymentId: {
        type: String,
    },
    payment_category: {
        type: String,
        enum: ['Cash On Delivery', 'Online'],
        default: 'Cash On Delivery',

    },

});


orderSchema.pre('find', function (next) {
    this.populate('userId')
    next()
})

orderSchema.pre('find', function (next) {
    this.populate('driverId')
    next()
})

orderSchema.pre('find', function (next) {
    this.populate('restaurant_id')
    next()
})


orderSchema.pre('find', function (next) {
    this.populate('user_address_id')
    next()
})



module.exports = mongoose.model('Order', orderSchema);