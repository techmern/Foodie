const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

//http://localhost:5000/restaurantmenu/viewMenuUser/1546476845
router.get('/viewMenuUser/:restaurant_id', async (req, res) => {
    const restaurant_id = req.params.restaurant_id;
    try {
        const restaurantMenus = await MenuModel.find({ restaurant_id });
        if (!restaurantMenus) {
            return res.status(404).json({ message: 'No menus found for this restaurant.' });
        }
        res.json(restaurantMenus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/deleteItem/:itemid',async(req,res)=>{
    const itemid = req.params.itemid
   
    try {
        const deleteItem = await MenuModel.findByIdAndDelete(itemid)
        if (!deleteItem) {
            return res.status(404).json({ 'error': 'Item not found' });
        }
        
        const imagePath = path.join(__dirname, '../foodmenu', deleteItem.food_itemImg);
        fs.unlinkSync(imagePath);
        res.status(200).json({'msg':'Item has deleted Successfully','sts':'1'})
    } catch (error) {
        res.status(500).json({"error":error})
    }
})


// http://localhost:5000/restaurantmenu/getMenu/11111
router.get('/getMenu/:itemid', async (req, res) => {
    const itemid = req.params.itemid; 
    try {
        const newMenu = await MenuModel.findById(itemid);
        if (!newMenu) {
            return res.status(404).json({ "error": "Food Item not found" });
        }
        res.json(newMenu);
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ "error": error.message });
    }
});


// http://localhost:5000/restaurantmenu/updateMenu/11111
router.put('/updateMenu/:itemid',async(req,res)=>{
    const itemid = req.params.itemid
    try {
        const updateMenu = await MenuModel.findByIdAndUpdate(
            itemid,
            req.body,
            {new:true}
            )
            res.status(200).json({'msg':'Food Item has Updated Successfully','sts':'1', data: updateMenu})
    } catch (error) {
        res.status(500).json({"error":error})
    }
})
router.post('/updatefoodimg/:id', uploadsingle.single('food_itemImg'), async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

       
        const oldItem = await MenuModel.findById(id);
        if (!oldItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        const oldFilename = oldItem.food_itemImg;

      
        const updatedItem = await MenuModel.findByIdAndUpdate(id, { food_itemImg: req.file.filename }, { new: true });

       
        fs.unlink(path.join('./foodmenu/', oldFilename), (err) => {
            if (err) {
                console.error('Error removing old image:', err);
            } else {
                console.log('Old image removed successfully');
            }
        });

        console.log('Food Item image updated successfully');
        return res.status(200).json({ message: 'Food Item image updated successfully', item: updatedItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating food item image', error: error.message });
    }
});


// http://localhost:5000/restaurantmenu/getMenuitem
router.get('/getMenuitem/:rid', async (req, res) => {
    const rid = req.params.rid;
    try {
        const menuItems = await MenuModel.find({ restaurant_id: rid });
        
        if (!menuItems || menuItems.length === 0) {
            return res.status(404).json({ error: "Menu items not found for the specified restaurant" });
        }

        res.json(menuItems);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router