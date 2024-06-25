// create_payout.js

const express = require('express');
const router = express.Router();
const Payout = require('../models/Payout');
const multer = require('multer');
const path = require('path');
const moment = require('moment');


// Set up multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'transactionImage/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// http://localhost:5000/payoutadmin/addPayout

router.post('/addPayout', upload.single('paymentImg'), async (req, res) => {
    const { restaurant_id, payout_amt } = req.body;
    const transaction_id = Math.floor(Math.random() * 1000000000).toString(); 
    const paymentImg = req.file ? req.file.filename : '';

    if (!restaurant_id || !transaction_id || !paymentImg || !payout_amt) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        const newPayout = new Payout({
            restaurant_id,
            transaction_id,
            paymentImg,
            payout_amt,
            createdAt: new Date() 
        });

        await newPayout.save();
        res.status(200).json({ msg: 'Payout added successfully' });
    } catch (error) {
        console.error('Error adding payout:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// http://localhost:5000/payoutadmin/getPayoutsAdmin

router.get('/getPayoutsAdmin', async (req, res) => {
    try {
        const startOfWeek = moment().startOf('isoWeek').toDate();
        const endOfWeek = moment().endOf('isoWeek').toDate();

        const payouts = await Payout.find({
            createdAt: {
                $gte: startOfWeek,
                $lte: endOfWeek
            }
        });

        const totalPayoutAmt = payouts.reduce((total, payout) => total + parseFloat(payout.payout_amt), 0);


        res.json({ totalPayoutAmt });
        console.log(`Total payout_amt for the week: ${totalPayoutAmt}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// http://localhost:5000/payoutadmin/getPayouts

router.get('/getPayouts', async (req, res) => {
    try {
        const payouts = await Payout.find(); 
        res.json(payouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



module.exports = router;
