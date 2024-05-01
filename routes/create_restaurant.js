const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const RestaurantModel = require('../Models/Restaurant')
// const ForgotOTPModel = require('../Models/ForgotPasswordRestaurant')

//http://localhost:5000/restaurant/addRestaurant
router.post('/addRestaurant',async(req,res)=>{
    try {
        
        const newRestaurant = new RestaurantModel({
            restaurantname:req.body.restaurantname,
            emailid:req.body.emailid,
            password:await bcrypt.hash(req.body.password, 12),
            mobno:req.body.mobno,
        })
        const addRestaurant = await newRestaurant.save()
        if (addRestaurant) {
            res.status(200).json({"msg":"Added","sts":0})
        } else {
            res.status(400).json({"msg":"Not Added","sts":1})
        }

    } catch (error) {
         console.error(error)   
    }

})

// // http://localhost:5000/restaurant/login
// router.post('/login', async (req, res) => {
//     const { emailid, password } = req.body;
    
//     try {
//         const restaurants = await RestaurantModel.findOne({ emailid })
//         if (restaurants) {
//             if (await bcrypt.compare(password, restaurants.password)) {
//                 res.json({ "msg": "Login Successfull", "loginsts": 2, restaurants })
//             } else {
//                 res.json({ "msg": "Password is wrong", "loginsts": 0 })
//             }
//         } else {
//             res.json({ "msg": "Restaurant not find", "loginsts": 1 })
            
//         }
//     } catch (error) {
//         res.status(500).json({ "error": error })
//         console.error(error);
//     }
    
// });

// // http://localhost:5000/restaurant/updateProfile/111111
// router.put('/updateProfile/:restaurantid', async (req, res) => {
//     const restaurantid = req.params.restaurantid;
//     try {
//         const updatedrestaurant = await RestaurantModel.findOneAndUpdate(
//             { _id: restaurantid },
//             req.body,
//             { new: true }
//         );
//         res.json({"msg":"Updated Successfully",updatedrestaurant});
//     } catch (error) {
//         res.status(500).json({ "error": error });
//     }
// });

// // http://localhost:5000/restaurant/updatepasswordotp

// router.post('/updatepasswordotp', async (req, res) => {
//     const { emailid, otp, newpass } = req.body;
//     try {
//         const forgot = await ForgotOTPModel.findOne({ emailid })
//         console.log(typeof forgot.otp.toString())
//         console.log(typeof otp)
//         if (forgot.otp.toString() === otp) {
//             const restaurants = await RestaurantModel.findOneAndUpdate({ emailid: emailid }, { password: newpass }, { new: true });
//             const delotp = await ForgotOTPModel.findOneAndDelete({ emailid: emailid });
//             res.status(200).json({ message: "Password updated successfully" });
//         } else {
//             return res.status(200).json({ message: "Check OTP" });
//         }
//     } catch (error) {
//         console.error(error)
//     }
// });

module.exports = router