const express = require('express')
const router = express.Router()

const OrderModel = require('../models/Order')

// http://localhost:5000/restaurantorder/viewOrder
router.get('/viewOrder', async (req, res) => {
    try {
        const orders = await OrderModel.find().populate('userId').populate('user_address_id').populate('restaurant_id').populate('driverId');
        if (!orders.length) {
            res.json("No Order Found");
        } else {
            const formattedOrders = orders.map(order => {
                return {
                    _id: order._id,
                    order_id: order.order_id,
                    user_address: order.user_address_id ? order.user_address_id.user_address : 'N/A',
                    landmark: order.user_address_id ? order.user_address_id.landmark : 'N/A',
                    pincode: order.user_address_id ? order.user_address_id.pincode : 'N/A',
                    userId: order.userId ? order.userId._id : 'N/A',
                    Username: order.userId.Username ? order.userId.Username : 'N/A',
                    Mob_No: order.userId ? order.userId.Mob_No : 'N/A',
                    Email_Id: order.userId ? order.userId.Email_Id : 'N/A',
                    driverId: order.driverId ? order.driverId._id : 'N/A',
                    drivername: order.driverId ? order.driverId.drivername : 'N/A',
                    phone_no: order.driverId ? order.driverId.phone_no : 'N/A',
                    items: order.items,
                    orderDate: order.orderDate,
                    orderTotal: order.orderTotal,
                    payment_category: order.payment_category,
                    paymentId: order.paymentId,
                    orderStatus: order.orderStatus,
                    deliveryStatus: order.deliveryStatus,
                    restaurant_id: order.restaurant_id,
                    restaurantname: order.restaurant_id.restaurantname ? order.restaurant_id.restaurantname : 'N/A',
                };
            });
            res.json(formattedOrders);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});




// http://localhost:5000/restaurantorder/updateOrderStatus/:orderId
router.put('/updateOrderStatus/:orderId', async (req, res) => {
    try {
        const { orderStatus } = req.body;
        await OrderModel.findByIdAndUpdate(req.params.orderId, { orderStatus });
        res.status(200).send('Order status updated');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// http://localhost:5000/restaurantorder/updateDeliveryStatus/:orderId

router.put('/updateDeliveryStatus/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { deliveryStatus, driverId } = req.body;

    try {
        const updateData = { deliveryStatus };
        if (deliveryStatus === 'Accept' && driverId) {
            updateData.driverId = driverId;
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update delivery status', error });
    }
});

// http://localhost:5000/restaurantorder/updatePaymentStatus/:orderId

router.put('/updatePaymentStatus/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { paymentId, payment_category } = req.body;

    try {
        const updateFields = {};
        
        if (paymentId) {
            updateFields.paymentId = paymentId;
        }

        if (payment_category) {
            updateFields.payment_category = payment_category;
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, updateFields, { new: true });

        res.status(200).json({ message: 'Payment status updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update payment status', error });
    }
});



// http://localhost:5000/restaurantorder/viewSingleOrder/${restaurant_id}
router.get('/viewSingleOrder/:restaurant_id', async (req, res) => {
    try {
        const { restaurant_id } = req.params;
        const orders = await OrderModel.find({ restaurant_id }).populate('userId').populate('user_address_id').populate('restaurant_id');
        // const orders = await OrderModel.find({ restaurant_id });


        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Orders not found' });
        } else {
            const formattedOrders = orders.map(order => {
                return {
                    _id: order._id,
                    order_id: order.order_id,
                    user_address: order.user_address_id ? order.user_address_id.user_address : 'N/A',
                    landmark: order.user_address_id ? order.user_address_id.landmark : 'N/A',
                    pincode: order.user_address_id ? order.user_address_id.pincode : 'N/A',
                    userId: order.userId ? order.userId._id : 'N/A',
                    Username: order.userId.Username ? order.userId.Username : 'N/A',
                    Mob_No: order.userId ? order.userId.Mob_No : 'N/A',
                    Email_Id: order.userId ? order.userId.Email_Id : 'N/A',
                    items: order.items,
                    orderDate: order.orderDate,
                    orderTotal: order.orderTotal,
                    orderStatus: order.orderStatus,
                    deliveryStatus: order.deliveryStatus,
                    restaurant_id: order.restaurant_id,
                    paymentId: order.paymentId,
                    payment_category: order.payment_category,
                };
            });
            res.json(formattedOrders);
        }

      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.get('/countPendingRestaurantOrder/:restaurant_id', async (req, res) => {
    try {
        const { restaurant_id } = req.params;
       
        const now = new Date();

        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const endOfDay = new Date(now.setHours(23, 59, 59, 999));

        const pendingOrderCount = await OrderModel.countDocuments({
            restaurant_id,
            deliveryStatus: 'Pending',
            orderDate: { $gte: startOfDay, $lte: endOfDay }
        });

        res.json({ count: pendingOrderCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// http://localhost:5000/restaurantorder/countAmount

router.get('/countAmount', async (req, res) => {
    const { fromDate, toDate, restaurantId } = req.query;

    let startDate, endDate;

    if (fromDate && toDate) {
        startDate = new Date(fromDate);
        endDate = new Date(toDate);
    } else {
        // Set default to last 7 days
        endDate = new Date();
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
    }

    try {
        const orders = await OrderModel.find({
            orderDate: { $gte: startDate, $lt: endDate },
            restaurant_id: restaurantId // Filter by restaurantId
        })
        .populate('userId')
        .populate('user_address_id')
        .populate('restaurant_id')
        .populate('driverId');

        let totalCOD = 0;
        let totalOnline = 0;

        orders.forEach(order => {
            if (order.payment_category === 'Cash On Delivery') {
                totalCOD += Number(order.orderTotal);
            } else if (order.payment_category === 'Online') {
                totalOnline += Number(order.orderTotal);
            }
        });

        res.json({ totalCOD, totalOnline });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/countAmountAdinSide', async (req, res) => {
    const { fromDate, toDate, restaurantId } = req.query;

    let startDate, endDate;

    if (fromDate && toDate) {
        startDate = new Date(fromDate);
        endDate = new Date(toDate);
    } else {
        // Set default to last 7 days
        endDate = new Date();
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
    }

    try {
        const orders = await OrderModel.find({
            orderDate: { $gte: startDate, $lt: endDate },
            restaurant_id: restaurantId // Filter by restaurantId
        });

        let totalCOD = 0;
        let totalOnline = 0;

        orders.forEach(order => {
            if (order.payment_category === 'Cash On Delivery') {
                totalCOD += Number(order.orderTotal);
            } else if (order.payment_category === 'Online') {
                totalOnline += Number(order.orderTotal);
            }
        });

        res.json({ totalCOD, totalOnline }); // Return both totalCOD and totalOnline
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router