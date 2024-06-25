const express = require('express');
const router = express.Router();
const ForgotOTPDriverModel = require('../Models/Forgot_Password_Driver');
const DriverModel = require('../Models/Driver');

router.post('/forgotpassotp', async (req, res) => {
    try {
        const { emailid, otp } = req.body;
        const existingDriver = await DriverModel.findOne({ emailid });
        if (!existingDriver) {
            return res.status(400).json({ message: "Invalid email ID" });
        }

        const newForgot = new ForgotOTPDriverModel({
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
