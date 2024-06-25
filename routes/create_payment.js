const express = require('express');
const router = express.Router()
const Order = require('../models/Order');

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'rzp_test_EqrXL3OgBTF9dW',
    key_secret: 'HjDF1U3m76HaaMqHSwGBm2yb',
});

// http://localhost:5000/payment/createorderpayment
router.post('/createorderpayment', async (req, res) => {
    try {
        const { amount } = req.body;
        // console.log('Received payment creation request. Amount:', amount);

        const options = {
            amount, // Amount in paise
            currency: 'INR',
            receipt: 'order_rcptid_11',
            payment_capture: 1,
        };
        const response = await razorpay.orders.create(options);
        console.log('Razorpay order created:', response);

        res.json(response);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        if (error.statusCode === 401) {
            res.status(401).json({ error: 'Authentication failed' });
        } else {
            res.status(500).json({ error: 'Failed to create Razorpay order' });
        }
    }
});




module.exports = router