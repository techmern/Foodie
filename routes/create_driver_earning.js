const express = require('express');
const router = express.Router();


const OrderModel = require('../models/Order')


// http://localhost:5000/driverorder/countAmount
router.get('/countAmount', async (req, res) => {
    const { fromDate, toDate, driverId } = req.query;

    let startDate, endDate;

    if (fromDate && toDate) {
        startDate = new Date(fromDate);
        endDate = new Date(toDate);
    } else {
        endDate = new Date();
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
    }

    try {
        const orders = await OrderModel.find({
            orderDate: { $gte: startDate, $lt: endDate },
            driverId: driverId 
        })
            .populate('userId')
            .populate('user_address_id')
            .populate('restaurant_id')
            .populate('driverId');

        let totalCOD = 0;
        orders.forEach(order => {
            if (order.payment_category === 'Cash On Delivery') {
                totalCOD += Number(order.orderTotal);
            }
        });

        res.json({ totalCOD });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
