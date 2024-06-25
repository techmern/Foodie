const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const DriverModel = require('../Models/Driver')

const ForgotOTPDriverModel = require('../Models/Forgot_Password_Driver')

// http://localhost:5000/driver/addDriver
router.post('/addDriver',async(req,res)=>{
    try {
        
        const newDriver = new DriverModel({
            drivername:req.body.drivername,
            emailid:req.body.emailid,
            password:req.body.password,
            phone_no:req.body.phone_no,
            city:req.body.city,
            license_no:req.body.license_no,
            vehicle_type:req.body.vehicle_type,
        })
        const addDriver = await newDriver.save()
        if (addDriver) {
            res.status(200).json({"msg":"Added","sts":0})
        } else {
            res.status(400).json({"msg":"Not Added","sts":1})
        }

    } catch (error) {
         console.error(error)   
    }

})


// http://localhost:5000/driver/viewDriver
router.get('/viewDriver', async (req, res) => {
    try {
        const newDriver = await DriverModel.find()
        res.json(newDriver)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

router.delete('/deleteDriver/:driverId',async(req,res)=>{
    const driverId = req.params.driverId
   
    try {
        const deleteDriver = await DriverModel.findByIdAndDelete(driverId)
        res.status(200).json({'msg':'Driver has deleted Successfully','sts':'1'})
    } catch (error) {
        res.status(500).json({"error":error})
    }
})

// http://localhost:5000/driver/getDriver/${driverId}
router.get('/getDriver/:driverId', async (req, res) => {
    const driverId = req.params.driverId; 
    try {
        const newDriver = await DriverModel.findById(driverId);
        if (!newDriver) {
            return res.status(404).json({ "error": "Driver not found" });
        }
        res.json(newDriver);
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ "error": error.message });
    }
});


// http://localhost:5000/driver/updateDriver/${driverId}
router.put('/updateDriver/:driverId',async(req,res)=>{
    const driverId = req.params.driverId
    try {
        const updateDriver = await DriverModel.findByIdAndUpdate(
            driverId,
            req.body,
            {new:true}
            )
            res.status(200).json({'msg':'Driver has Updated Successfully','sts':'1', data: updateDriver})
            // res.json(updateDriver)
    } catch (error) {
        res.status(500).json({"error":error})
    }
})


// http://localhost:5000/driver/countDriver
router.get('/countDriver', async (req, res) => {
    try {
        const DriverCount = await DriverModel.countDocuments();
        res.json({ count: DriverCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// http://localhost:5000/driver/driverlogin
router.post('/driverlogin', async (req, res) => {
    const { emailid, password } = req.body;
    
    try {
        const driver = await DriverModel.findOne({ emailid });
        if (driver) {
            if (password === driver.password) {
                return res.json({ "msg": "Login Successful", "loginsts": 2, driver });
            } else {
                return res.json({ "msg": "Password is wrong", "loginsts": 0 });
            }
        } else {
            return res.json({ "msg": "Driver not found", "loginsts": 1 });
        }
    } catch (error) {
        res.status(500).json({ "error": error });
        console.error(error);
    }
});

// http://localhost:5000/driver/driverProfile/${driver._id}
router.get('/driverProfile/:id', async (req, res) => {
    try {
        const driver = await DriverModel.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        res.json(driver);
    } catch (error) {
        res.status(400).json({ error: 'Error: ' + error.message });
    }
});

// http://localhost:5000/driver/updatepasswordotp

router.post('/updatepasswordotp', async (req, res) => {
    const { emailid, otp, newpass } = req.body;
    try {
        const forgot = await ForgotOTPDriverModel.findOne({ emailid })
        console.log(typeof forgot.otp.toString())
        if (forgot.otp.toString() === otp) {
            const drivers = await DriverModel.findOneAndUpdate({ emailid: emailid }, { password: newpass }, { new: true });
            const delotp = await ForgotOTPDriverModel.findOneAndDelete({ emailid: emailid });
            res.status(200).json({ message: "Password updated successfully" });
        } else {
            return res.status(200).json({ message: "Check OTP" });
        }
    } catch (error) {
        console.error(error)
    }
});

module.exports = router