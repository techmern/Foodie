const express = require('express');
const router = express.Router();
const User_Address = require('../models/User_Address');
const User = require('../models/User');



// http://localhost:5000/useraddress/addaddress
router.post('/addaddress', async (req, res) => {
    const { userId, user_address, landmark, pincode } = req.body;
  
    // Check for required fields
    if (!userId || !user_address || !pincode) {
      return res.status(400).json({ msg: 'Missing required fields', sts: '1' });
    }
  
    try {
      // Check if the user exists (optional, depending on your application logic)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'User not found', sts: '1' });
      }
  
      const newUserAddress = new User_Address({
        userId,
        user_address,
        landmark,
        pincode
      });
  
      const saveUserAddress = await newUserAddress.save();
      res.status(200).json({ msg: 'User Address added Successfully', sts: '0', data: saveUserAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'An error occurred', error: error.message });
    }
  });

// http://localhost:5000/useraddress/viewaddress

router.get('/viewaddress', async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ 'Error': 'User ID is required' });
    }

    const userAddresses = await User_Address.find({ userId: userId });

    if (!userAddresses || userAddresses.length === 0) {
      return res.status(404).json({ 'Error': 'No addresses found for the given user ID' });
    }

    res.json(userAddresses);
  } catch (error) {
    console.error('Error fetching user addresses:', error);

    res.status(500).json({ 'Error': error.message });
  }
});

  
module.exports = router;