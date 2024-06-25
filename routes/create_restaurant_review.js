const express = require('express');
const router = express.Router()

const User = require('../models/User');
const RestaurantModel = require('../Models/Restaurant')
const Restaurant_Rating = require('../models/Restaurant_Rating');


// http://localhost:5000/restaurantreview/addrestaurantreview

router.post('/addrestaurantreview', async (req, res) => {
    try {
        const userId = req.body.userId; 
        const restaurantId = req.body.restaurantId; 

        // Check if the user ID and restaurant ID are valid
        const user = await User.findById(userId);
        const restaurant = await RestaurantModel.findById(restaurantId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        const newReview = new Restaurant_Rating({
            userId: userId,
            restaurantId: restaurantId,
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


// http://localhost:5000/restaurantreview/viewrestaurantreview
router.get('/viewrestaurantreview', async (req, res) => {
    try {
      const reviews = await Restaurant_Rating.find().populate('restaurantId').populate('userId');
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

module.exports = router