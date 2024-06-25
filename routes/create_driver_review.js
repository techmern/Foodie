const express = require('express');
const router = express.Router()
const User = require('../models/User');
const Order = require('../models/Order');
const Driverrating = require('../models/Driver');
const Driver_Rating = require('../models/Driver_Rating');
const mongoose = require('mongoose');


// http://localhost:5000/driverreview/adddrivereview

router.post('/adddrivereview', async (req, res) => {
    try {
      const { userId, orderId, driverId, rating, review } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(driverId)) {
        return res.status(400).json({ msg: 'Invalid driverId' });
      }
  
      const user = await User.findById(userId);
      const order = await Order.findById(orderId)
      const driver = await Driverrating.findById(driverId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }
  
      if (!driver) {
        return res.status(404).json({ msg: 'Driver not found' });
      }
  
      const newReview = new Driver_Rating({
        userId,
        orderId,
        driverId,
        rating,
        review,
      });
  
      const savedReview = await newReview.save();
      res.status(200).json({ msg: 'Review added successfully', review: savedReview });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  });


  // http://localhost:5000/driverreview/viewDriverview
router.get('/viewDriverview', async (req, res) => {
  try {
      const reviews = await Driver_Rating.find().populate('orderId').populate('userId').populate('driverId');
      res.json(reviews);
  } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

module.exports = router