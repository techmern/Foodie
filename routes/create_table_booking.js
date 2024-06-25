const express = require('express');
const Booking = require('../models/Booking');
const Table_Restaurant = require('../models/Table_Restaurant');
const Restaurant = require('../Models/Restaurant');
const User = require('../models/User');
const router = express.Router();




// http://localhost:5000/tablebooking/addtablebooking
router.post('/addtablebooking', async (req, res) => {
    try {
        // Extract IDs from request body
        const { userId,
            restaurant_id,
            table_id,
            booking_date,
            number_of_people,
            first_name,
            last_name,
            Email_Id,
            Mob_No,
            additional_request,
            } = req.body;

        // Check if userId exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: 'User not found', sts: '1' });
        }

        // Check if restaurant_id exists
        const restaurant = await Restaurant.findById(restaurant_id);
        if (!restaurant) {
            return res.status(400).json({ msg: 'Restaurant not found', sts: '1' });
        }

        // Check if table_id exists
        
        const table = await Table_Restaurant.findById(table_id);
        if (!table) {
            return res.status(400).json({ msg: 'Table not found', sts: '1' });
        }

        // Create new booking
        const newbooking = new Booking({
            restaurant_id,
            userId,
            table_id,
            booking_date,
            number_of_people,
            first_name,
            last_name,
            Email_Id,
            Mob_No,
            additional_request,
        });

        // Save the booking
        const savebooking = await newbooking.save();

        // Respond with success message
        res.status(200).json({ msg: 'Table Booked Successfully', sts: '0', booking: savebooking });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred', sts: '1' });
    }
});


// http://localhost:5000/tablebooking/viewBookedTable
router.get('/viewBookedTable', async (req, res) => {
    try {
        const newtable = await Booking.find()
        res.json(newtable)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})


// http://localhost:5000/tablebooking/getBookingDetails/${tableId}
router.get('/getBookingDetails/:tableId', async (req, res) => {
    try {
        const tableId = req.params.tableId;
        const bookings = await Booking.find({ table_id: tableId });
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// http://localhost:5000/tablebooking/updateBookingStatus/${bookingDetails._id}
router.put('/updateBookingStatus/:bookingId', async (req, res) => {
const { bookingId } = req.params;
const { booking_status } = req.body;

try {
    const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { booking_status },
        { new: true }
    );

    res.json(updatedBooking);
} catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: 'An error occurred while updating booking status' });
}
});

// http://localhost:5000/tablebooking/bookingdetails

router.get('/bookingdetails', async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ 'Error': 'User ID is required' });
        }

        const bookingDetails = await Booking.find({ userId }).populate('restaurant_id'); // Assuming restaurant_id is the field linking to Restaurant

        if (!bookingDetails || bookingDetails.length === 0) {
            return res.status(404).json({ 'Error': 'No booking details found for the given user ID' });
        }

        res.json(bookingDetails);
    } catch (error) {
        console.error('Error fetching user booking details:', error);
        res.status(500).json({ 'Error': error.message });
    }
});

module.exports = router;