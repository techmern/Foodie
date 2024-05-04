const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const multer = require('multer');
const path = require('path');

const MenuModel = require('../models/Menu_Restaurant')
const RestaurantModel = require('../Models/Restaurant');
const { log } = require('console');


const store = multer.diskStorage({
    destination: './foodmenu/',
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

//http://localhost:5000/restaurantmenu/addMenu
router.post('/addMenu', uploadsingle.single('food_itemImg'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ "msg": "No file uploaded", "sts": 1 });
        }

        const restaurant_id = req.body.restaurant_id;

        const newmenu = new MenuModel({
            restaurant_id: restaurant_id,
            item_name: req.body.item_name,
            item_price: req.body.item_price,
            item_ingredients: req.body.item_ingredients,
            item_description: req.body.item_description,
            food_itemImg: req.file.filename,
        });

        const addMenu = await newmenu.save();
        
        if (addMenu) {
            res.status(200).json({ "msg": "Added", "sts": 0 });
        } else {
            res.status(400).json({ "msg": "Not Added", "sts": 1 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "msg": "Server Error", "sts": 1 });
    }
});

// http://localhost:5000/restaurantmenu/viewMenu
router.get('/viewMenu', async (req, res) => {
    try {
        const newmenu = await MenuModel.find()
        res.json(newmenu)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})


module.exports = router