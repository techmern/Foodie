const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true,
    },
    table_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table', 
        required: true,
    },
    booking_date: {
        type: Date,
        required: true,
    },
    number_of_people: {
        type: Number,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    Email_Id: {
        type: String,
        required: true,
    },
    Mob_No: {
        type: Number,
        required: true,
    },
    additional_request: {
        type: String,
    },
    booking_status: {
        type: String,
        enum: ['Confirmed', 'Pending', 'Cancelled'],
        default: 'Pending',
    },
});

module.exports = mongoose.model('booking', bookingSchema);