const express = require('express');
const router = express.Router();
const ForgotOTPRestaurantModel = require('../Models/Forgot_Password_Restaurant');
const RestaurantModel = require('../Models/Restaurant');

router.post('/forgotpassotp', async (req, res) => {
    try {
        // Check if the email exists in the RestaurantModel
        const { emailid, otp } = req.body;
        const existingRestaurant = await RestaurantModel.findOne({ emailid });
        if (!existingRestaurant) {
            return res.status(400).json({ message: "Invalid email ID" });
        }

        const newForgot = new ForgotOTPRestaurantModel({
            emailid,
            otp,
        });
        const savedForgotOTP = await newForgot.save();
        
        if (savedForgotOTP) {
            console.log("OTP saved:", otp);
            return res.status(200).json({ message: "OTP added successfully", status: 0, savedForgotOTP });
        } else {
            return res.status(500).json({ message: "Failed to save OTP", status: 1 });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", status: 2 });
    }
});

module.exports = router;
