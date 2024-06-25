const express = require('express');
const Order = require('../models/Order');
const router = express.Router()




//  http://localhost:5000/placeorder/addplaceorder

function generateOrderId() {
   
    return Math.random().toString(36).substr(2, 9); 
}
router.post('/addplaceorder', async (req, res) => {
    try {
        const { userId, restaurant_id,user_address_id, cartData } = req.body;

        const orderTotal = cartData.reduce((total, item) => total + item.item_price * item.quantity, 0);

        const order_id = generateOrderId(); // You need to implement this function

        // Create and save the order with all items
        const order = new Order({
            order_id,
            userId,
            restaurant_id: restaurant_id, 
            items: cartData.map(item => ({
                item_name: item.item_name,
                item_price: parseFloat(item.item_price),
                quantity: item.quantity,
                item_description: item.item_description,
                item_ingredients: item.item_ingredients,
                food_itemImg: item.food_itemImg,
            })),
            user_address_id,
            orderTotal,
            orderStatus: "Pending",
            deliveryStatus: "Pending",
            payment_category: req.body.payment_category,
            paymentId: req.body.paymentId,
        });

        await order.save();


        res.status(201).json({ message: 'Orders placed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//.. http://localhost:5000/placeorder/ordernotify
router.get('/ordernotify', async (req, res) => {
    try {
        const userId = req.query.userId;
  
        if (!userId) {
            return res.status(400).json({ 'Error': 'User ID is required' });
        }
  
        const orderdetail = await Order.find({ userId: userId })
            .populate('driverId')
            .populate('restaurant_id')
            .populate('user_address_id');
  
        if (!orderdetail || orderdetail.length === 0) {
            return res.status(404).json({ 'Error': 'No order details found for the given user ID' });
        }
  
        res.json(orderdetail);
    } catch (error) {
        console.error('Error fetching user order details:', error);
  
        if (error.name === 'CastError') {
            // Handle invalid ObjectId errors
            res.status(400).json({ 'Error': 'Invalid user ID format' });
        } else {
            res.status(500).json({ 'Error': 'Internal Server Error', 'Details': error.message });
        }
    }
  });
  
module.exports = router