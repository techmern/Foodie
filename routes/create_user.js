const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const multer = require('multer');
const path = require('path');

const router = express.Router();

const fs = require('fs');
const Token = require('../models/Token');
const Forgot_Password_User = require('../models/Forgot_Password_User');

const SECRET_key = "qwerty"


// http://localhost:5000/user/userregister

router.post('/userregister', async (req, res) => {
    try {
        const newUser = new User({
            Username: req.body.Username,
            Email_Id: req.body.Email_Id,
            Password: await bcrypt.hash(req.body.Password, 12),
            Mob_No: req.body.Mob_No,

        })

        const saveUser = await newUser.save();
        // res.json(saveUser);
        if (saveUser) {
            res.status(200).json({ 'msg': 'User Data added Successfully', 'sts': '0' })
        } else {
            res.status(500).json({ 'msg': 'User Data Failed', 'sts': '1' })
        }

    } catch (error) {
        console.error(error);
    }

})

//  http://localhost:5000/user/checktoken
router.post('/checktoken', async (req, res) => {
    const token = req.body.token

    try {
        const tokenchk = await Token.findOne({ token });
        if (!tokenchk) {
            return res.json({ 'tokensts': '1' })

        } else {
            return res.json({ 'tokensts': '0' })
        }

    } catch (error) {
        console.error(error)
    }

})


// VIEW -- http://localhost:5000/user/viewuser
router.get('/viewuser', async (req, res) => {
    try {
        const users = await User.find()

        res.json(users)

    } catch (error) {
        res.status(500).json({ 'Error': error })

    }
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'userprofile/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });



router.put('/uploaduserprofile/:upid', upload.single('User_profile'), (req, res) => {
    res.json({ 'msg': 'File is Uploaded' });
});


//  UPDATE-- http://localhost:5000/user/updateuser
router.put('/updateuser', upload.single('User_profile'), async (req, res) => {
    try {
        const { Email_Id, Password, Username, Mob_No } = req.body;
        const User_profile = req.file ? req.file.path : null;
        // Update user logic here...
        

        const user = await User.findOne({ Email_Id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.Username = Username;
        user.Password = await bcrypt.hash(Password, 12);
        user.Mob_No = Mob_No;
        if (User_profile) {
            user.User_profile = User_profile;
        }

        await user.save();

        res.json({ message: 'Profile updated successfully', User_profile });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// LOGIN --  http://localhost:5000/user/userlogin
router.post('/userlogin', async (req, res) => {
    const { Email_Id, Password } = req.body;

    try {
        const login = await User.findOne({ Email_Id });

        if (!login) {
            return res.json({ 'msg': 'Email not found', 'loginsts': 0 });
        } else {
            if (await bcrypt.compare(Password, login.Password)) {
                const token = jwt.sign({ userId: login._id }, SECRET_key, { expiresIn: '1h' }); // Generate token
                const expiresAt = new Date(Date.now() + (60 * 60 * 1000));

                const tokensave = new Token({
                    userId: login._id,
                    token,
                    expiresAt,
                });

                await tokensave.save();

                // Send user data along with the response
                const userData = {
                    _id: login._id,
                    Username: login.Username,
                    Email_Id: login.Email_Id,
                    Mob_No: login.Mob_No,
                    User_profile: login.User_profile,
                };

                return res.json({ 'msg': 'Login Successfully', 'loginsts': 2, userData, token });
            } else {
                return res.json({ 'msg': 'Password is Incorrect', 'loginsts': 1 });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 'msg': 'Server Error' });
    }
});


// http://localhost:5000/user/userlogout

router.post('/userlogout', async (req, res) => {
    const token = req.body.token
    try {
        const logout = await Token.findOneAndDelete({ token })
        if (!logout) {
            return res.json({ 'msg': 'Logout Succuessfully', 'logoutsts': 0 })
        } else {
            return res.json({ 'msg': 'Failed to login', 'logoutsts': 1 })

        }
    } catch (error) {
        res.status(500).json({ 'Error': error })


    }
})

// VIEW SINGLE USER   http://localhost:5000/user/singleuser
router.get('/singleuser/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// http://localhost:5000/user/viewuser
router.get('/viewuser', async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const userdetail = await User.findone({ userId: userId });
        console.log('User details fetched:', userdetail);

        if (!userdetail || userdetail.length === 0) {
            return res.status(404).json({ error: 'No user details found for the given user ID' });
        }

        res.json(userdetail);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router