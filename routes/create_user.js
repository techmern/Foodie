const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const multer = require('multer');
const path = require('path');

const router = express.Router();

const fs = require('fs');



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

// VIEW -- http://localhost:5000/user/viewuser
router.get('/viewuser', async (req, res) => {
    try {
        const users = await User.find()

        res.json(users)

    } catch (error) {
        res.status(500).json({ 'Error': error })

    }
})




// set up storage engine  for single file
const store = multer.diskStorage({
    destination: './userprofile/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))

    }
})

// initiaze multer
const upload = multer({
    storage: store,
    limits: { filesize: 5000000 }
})

router.put('/uploaduserprofile/:upid', upload.single('User_profile'), (req, res) => {
    res.json({ 'msg': 'File is Uploaded' });
});

//  UPDATE-- http://localhost:5000/user/updateuser/65cc4ccbb8c7f30a9381061c
router.put('/updateuser', upload.single('User_profile'), async (req, res) => {
    const { Email_Id, Password, Username, Mob_No } = req.body;

    try {
        let updateData = {
            Username: Username,
            Email_Id: Email_Id,
            Mob_No: Mob_No,
        };

        if (req.file) {
            updateData.User_profile = req.file.path;
        }

        const userLoginData = await User.findOneAndUpdate({ Email_Id, Password });

        if (!userLoginData) {
            return res.status(404).json({ 'msg': 'User not found' });
        }

        // Remove old user profile image
        if (req.file && userLoginData.User_profile) {
            fs.unlinkSync(userLoginData.User_profile); // Remove the old image file
        }

        // Update user data
        await User.findByIdAndUpdate(userLoginData._id, updateData);

        if (Password) {
            const hashedPassword = await bcrypt.hash(Password, 12);
            await User.updateOne({ Email_Id }, { Password: hashedPassword });
        }


        res.status(200).json({ 'msg': 'User has been updated successfully' });
    } catch (error) {
        res.status(500).json({ 'Error': error.message });
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
                // Send user data along with the response
                const userData = {
                    _id:login._id,
                    Username: login.Username,
                    Email_Id: login.Email_Id,
                    Password: login.Password,
                    Mob_No: login.Mob_No,
                };

                

                return res.json({ 'msg': 'Login Successfully', 'loginsts': 2, userData });
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
    const uid = req.params.uid
    try {
        const logout = await User.findByIdAndDelete(uid)
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
router.get('/singleuser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router
