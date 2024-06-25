const express = require('express')
const router = express.Router()

const CityModel = require('../Models/City')

// http://localhost:5000/city/addCity
router.post('/addCity',async(req,res)=>{
    try {
        
        const newCity = new CityModel({
            cityname:req.body.cityname,
            city_postalcode:req.body.city_postalcode,
            citystatus:req.body.citystatus,
        })
        const addCity = await newCity.save()
        if (addCity) {
            res.status(200).json({"msg":"Added","sts":0})
        } else {
            res.status(400).json({"msg":"Not Added","sts":1})
        }

    } catch (error) {
         console.error(error)   
    }

})


// http://localhost:5000/city/viewCity
router.get('/viewCity', async (req, res) => {
    try {
        const newCity = await CityModel.find()
        res.json(newCity)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

router.delete('/deleteCity/:cityId',async(req,res)=>{
    const cityId = req.params.cityId
   
    try {
        const deleteCity = await CityModel.findByIdAndDelete(cityId)
        res.status(200).json({'msg':'City has deleted Successfully','sts':'1'})
    } catch (error) {
        res.status(500).json({"error":error})
    }
})

// http://localhost:5000/city/getCity/${cityId}
router.get('/getCity/:cityId', async (req, res) => {
    const cityId = req.params.cityId; 
    try {
        const newCity = await CityModel.findById(cityId);
        if (!newCity) {
            return res.status(404).json({ "error": "City not found" });
        }
        res.json(newCity);
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ "error": error.message });
    }
});


// http://localhost:5000/city/updateCity/${cityId}
router.put('/updateCity/:cityId', async (req, res) => {
    const cityId = req.params.cityId;
    try {
      const updateCity = await CityModel.findByIdAndUpdate(cityId, req.body, { new: true });
      if (updateCity) {
        res.status(200).json({ msg: 'City has Updated Successfully', sts: '1', data: updateCity });
      } else {
        res.status(404).json({ msg: 'City not found', sts: '0' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  

// http://localhost:5000/city/countCity
router.get('/countCity', async (req, res) => {
    try {
        const CityCount = await CityModel.countDocuments();
        res.json({ count: CityCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router