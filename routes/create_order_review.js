const express = require('express');
const router = express.Router()
const User = require('../models/User');
const Order_Rating = require('../models/Order_Rating');
const Order = require('../models/Order');


// http://localhost:5000/ordereview/addordereview

router.post('/addordereview', async (req, res) => {
    try {
        const userId = req.body.userId; 
        const orderId = req.body.orderId; 

        const user = await User.findById(userId);
        const order = await Order.findById(orderId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!order) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        const newReview = new Order_Rating({
            userId: userId,
            orderId: orderId,
            rating: req.body.rating,
            review: req.body.review,
        });

        const savedReview = await newReview.save();
        res.status(200).json({ msg: 'Review added successfully', review: savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});



// http://localhost:5000/ordereview/viewOrderreview
router.get('/viewOrderreview', async (req, res) => {
    try {
        const reviews = await Order_Rating.find().populate('orderId').populate('userId');
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// http://localhost:5000/ordereview/addReply
router.post('/addReply', async (req, res) => {
    try {
        const { reviewId, reply } = req.body;

        const review = await Order_Rating.findById(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        review.reply = reply;
        const savedReview = await review.save();

        res.status(200).json(savedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router