const express = require('express');
const Forgot_Password_User = require('../models/Forgot_Password_User');
const User = require('../models/User');
const router = express.Router()
const bcrypt = require('bcryptjs');




//  http://localhost:5000/forgotuserpassword/sendoptuser

router.post('/sendoptuser', async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the request body for debugging


        if (!req.body.Email_Id) {
            return res.status(400).json({ "msg": "Email is required", "sts": 1 });
        }


        const useropt = Math.floor(1000 + Math.random() * 9000);

        const sendotp = new Forgot_Password_User({
            Email_Id: req.body.Email_Id,
            otp: useropt
        });

        const forgotpass = await sendotp.save();

        if (forgotpass) {

            const otp    = `${useropt}`;
            console.log('Generated otp:', otp);

            return res.status(200).json({ "msg": "Reset link sent successfully", "sts": 0, forgotpass });
        } else {
            return res.status(400).json({ "msg": "Failed to save reset link", "sts": 1 });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({ "msg": "Internal server error", "sts": 1 });
    }
});


//  http://localhost:5000/forgotuserpassword/resetuserpassword

router.post('/resetuserpassword', async (req, res) => {

    const { Email_Id, otp, Password } = req.body;

    console.log(Email_Id)
    try {

        console.log('Request Body:', req.body); 
      
        const forgetpwd = await Forgot_Password_User.findOne({ Email_Id })
        if (!forgetpwd) {
            return res.status(400).json({ message: 'Email not found. Please check your email and try again.' });
        }

        console.log(forgetpwd.otp);
        
        if (forgetpwd.otp.toString() === otp) {
            console.log('OTP match found.');

            const hashedPassword = await bcrypt.hash(Password, 12);

            const user = await User.findOneAndUpdate(
                { Email_Id: Email_Id },
                { Password: hashedPassword },
                { new: true }
            );

            const delotp = await Forgot_Password_User.findOneAndDelete({ Email_Id: Email_Id });


            return res.status(200).json({ message: 'Password reset successful' });

        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }

})






module.exports = router