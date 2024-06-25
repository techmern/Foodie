const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    transaction_id: {
        type: String,
        required: true,
    },
    payout_amt: {
        type: String,
        required: true,
    },
    paymentImg: {
        type: String,
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
});

payoutSchema.pre('find', function (next) {
    this.populate('restaurant_id')
    next()
})

module.exports = mongoose.model('Payout', payoutSchema);
