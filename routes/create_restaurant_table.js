const express = require('express')
const router = express.Router()


const TableModel = require('../models/Table_Restaurant')
const RestaurantModel = require('../Models/Restaurant')

//http://localhost:5000/restauranttable/addTable
router.post('/addTable',async(req,res)=>{
    try {
        const restaurant_id = req.body.restaurant_id;

        const newtable = new TableModel({
            restaurant_id: restaurant_id,
            table_number:req.body.table_number,
            table_capacity:req.body.table_capacity,

        })
        const addTable = await newtable.save()
        if (addTable) {
            res.status(200).json({"msg":"Added","sts":0})
        } else {
            res.status(400).json({"msg":"Not Added","sts":1})
        }

    } catch (error) {
         console.error(error)   
    }

})


// http://localhost:5000/restauranttable/viewTable
router.get('/viewTable', async (req, res) => {
    try {
        const newtable = await TableModel.find()
        res.json(newtable)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

router.put('/updateAvailability', async (req, res) => {
    const { tableIds, availability } = req.body;
    try {
        await TableModel.updateMany(
            { _id: { $in: tableIds } }, 
            { $set: { table_availability: availability } });
        res.status(200).json({ message: "Table availability updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/deleteTable/:tableid',async(req,res)=>{
    const tableid = req.params.tableid
   
    try {
        const deleteTable = await TableModel.findByIdAndDelete(tableid)
        res.status(200).json({'msg':'Table has deleted Successfully','sts':'1'})
    } catch (error) {
        res.status(500).json({"error":error})
    }
})

// http://localhost:5000/restauranttable/getTable/11111
router.get('/getTable/:tableId', async (req, res) => {
    const tableId = req.params.tableId; 
    try {
        const newTable = await TableModel.findById(tableId);
        if (!newTable) {
            return res.status(404).json({ "error": "Table not found" });
        }
        res.json(newTable);
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ "error": error.message });
    }
});

// http://localhost:5000/restauranttable/updateTable/11111
router.put('/updateTable/:tableId',async(req,res)=>{
    const tableId = req.params.tableId
    try {
        const updateTable = await TableModel.findByIdAndUpdate(
            tableId,
            req.body,
            {new:true}
            )
            res.status(200).json({'msg':'Table has Updated Successfully','sts':'1'})
            res.json(updateTable)
    } catch (error) {
        res.status(500).json({"error":error})
    }
})

module.exports = router