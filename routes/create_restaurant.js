const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

const RestaurantModel = require('../Models/Restaurant')

const ForgotOTPRestaurantModel = require('../Models/Forgot_Password_Restaurant')

const TokenModel = require('../Models/Restaurant_Token')


const SECRET_KEY = "battery"

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

// http://localhost:5000/restaurant/login
router.post('/login', async (req, res) => {
    const { emailid, password } = req.body;
    
    try {
        const restaurants = await RestaurantModel.findOne({ emailid })
        if (restaurants) {
            if (await bcrypt.compare(password, restaurants.password)) {
                const token = jwt.sign({ResId:restaurants._id},SECRET_KEY,{expiresIn:'1hr'})
                const expiresAt = new Date(Date.now()+(60*60*1000))

                const tokenSave = new TokenModel({
                    restaurant_id:restaurants._id,
                    token,
                    expiresAt,
                }) 
                await tokenSave.save()

                return res.json({ "msg": "Login Successfull", "loginsts": 2, restaurants, token })
            } else {
                res.json({ "msg": "Password is wrong", "loginsts": 0})
            }
        } else {
            res.json({ "msg": "Restaurant not find", "loginsts": 1 })
            
        }
    } catch (error) {
        res.status(500).json({ "error": error })
        console.error(error);
    }
    
});



// http://localhost:5000/restaurant/checktoken

router.post('/checktoken', async (req, res) => {
    const token = req.body.token
    try {
        const tokenchk = await TokenModel.findOne({ token })
        if(!tokenchk){
            res.json({'tokensts':1})
        }else{
            res.json({'tokensts':0})
        }
    } catch (error) {
         console.error(error);
    }
});

// http://localhost:5000/restaurant/logout
router.post('/logout',async (req, res) => {
    const token = req.body.token
    try {
        const logout = await TokenModel.findOneAndDelete({ token })
        if(!logout){
            res.json({'logout_sts':1})
        }else{
            res.json({'logout_sts':0})
        }
    } catch (error) {
        console.error(error);
    }
}); 

const store = multer.diskStorage({
    destination: './restaurantlogo/',
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const filename = `${timestamp}${extension}`;
        cb(null, filename);
    }
});


const uploadsingle = multer({
    storage: store,
    limits: { fileSize: 5000000 }
});


// http://localhost:5000/restaurant/updateProfile/111111
const fs = require('fs');

router.put('/updateProfile/:restaurantid', uploadsingle.single('restaurantImg'), async (req, res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const restaurantid = req.params.restaurantid;
        const previousRestaurant = await RestaurantModel.findOne({ _id: restaurantid });
        const previousImagePath = `./restaurantlogo/${previousRestaurant.restaurantImg}`;

        if (fs.existsSync(previousImagePath)) {
            fs.unlinkSync(previousImagePath);
        }

        const updatedData = { ...req.body };
        updatedData.restaurantImg = req.file.filename;

        if (!updatedData.password) {
            return res.status(400).json({ message: 'No password provided' });
        }

        const bcryptPassword = await bcrypt.hash(updatedData.password, 10);

        const updatedrestaurant = await RestaurantModel.findOneAndUpdate(
            { _id: restaurantid },
            { ...updatedData, password: bcryptPassword },
            { new: true }
        );

        res.json({ message: 'Profile updated successfully', updatedrestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/restaurantProfile/:id', async (req, res) => {
    try {
        const restaurant = await RestaurantModel.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(400).json({ error: 'Error: ' + error.message });
    }
});


// http://localhost:5000/restaurant/updatepasswordotp

router.post('/updatepasswordotp', async (req, res) => {
    const { emailid, otp, newpass } = req.body;
    try {
        const forgot = await ForgotOTPRestaurantModel.findOne({ emailid })
        console.log(typeof forgot.otp.toString())
        if (forgot.otp.toString() === otp) {
            const restaurants = await RestaurantModel.findOneAndUpdate({ emailid: emailid }, { password: newpass }, { new: true });
            const delotp = await ForgotOTPRestaurantModel.findOneAndDelete({ emailid: emailid });
            res.status(200).json({ message: "Password updated successfully" });
        } else {
            return res.status(200).json({ message: "Check OTP" });
        }
    } catch (error) {
        console.error(error)
    }
});

module.exports = router