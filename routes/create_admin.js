const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const AdminModel = require('../Models/Admin')


// http://localhost:5000/admin/adminlogin
router.post('/adminlogin', async (req, res) => {
    const { emailid, password } = req.body;
    
    try {
        const admin = await AdminModel.findOne({ emailid })
        if (admin) {
            if ((password === admin.password)) {
                return res.json({ "msg": "Login Successfull", "loginsts": 2, admin })
            } else {
                res.json({ "msg": "Password is wrong", "loginsts": 0})
            }
        } else {
            res.json({ "msg": "Admin not find", "loginsts": 1 })
            
        }
    } catch (error) {
        res.status(500).json({ "error": error })
        console.error(error);
    }
    
});

// http://localhost:5000/restaurant/countRestaurant
router.get('/countRestaurant', async (req, res) => {
    try {
        const restaurantCount = await RestaurantModel.countDocuments();
        res.json({ count: restaurantCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router