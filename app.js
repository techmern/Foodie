require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const db = require('./db')

const path = require('path');


// Define all Router
const createRestaurantRouter = require('./routes/create_restaurant')
const forgotRestaurantRoutes = require('./routes/forgot_otp_restaurant')
const forgotDriverRoutes = require('./routes/forgot_otp_driver')
const tableRestaurantRoutes = require('./routes/create_restaurant_table')
const menuRestaurantRoutes = require('./routes/create_restaurant_menu')
const orderRestaurantRoutes = require('./routes/create_restaurant_order')
const createUserRouter = require('./routes/create_user')
const createAdminRouter = require('./routes/create_admin')
const createDriverRouter = require('./routes/create_driver')
const createCityRouter = require('./routes/create_city')
const createtablebookingRouter = require('./routes/create_table_booking')
const createPlaceOrderRouter = require('./routes/create_place_order')
const createUserAddressRouter = require('./routes/create_user_address')
const createRestaurantReviewRouter = require('./routes/create_restaurant_review')
const createOrderReviewRouter = require('./routes/create_order_review')
const createDriverReviewRouter = require('./routes/create_driver_review')
const createdriverearningRouter = require('./routes/create_driver_earning')
const createPayoutRouter = require('./routes/create_payout')
const createforgotUserPassowrdRouter = require('./routes/forgot_otp_user')
const createPaymentRouter = require('./routes/create_payment')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT

// Define Routes
app.use('/restaurant', createRestaurantRouter)
app.use('/forgototprestaurant', forgotRestaurantRoutes)
app.use('/forgototpdriver', forgotDriverRoutes)
app.use('/restauranttable', tableRestaurantRoutes)
app.use('/restaurantmenu', menuRestaurantRoutes)
app.use('/restaurantorder', orderRestaurantRoutes)
app.use('/user', createUserRouter)
app.use('/admin', createAdminRouter)
app.use('/driver', createDriverRouter)
app.use('/city', createCityRouter)
app.use('/tablebooking', createtablebookingRouter)
app.use('/placeorder', createPlaceOrderRouter)
app.use('/useraddress', createUserAddressRouter)
app.use('/forgotuserpassword', createforgotUserPassowrdRouter)
app.use('/restaurantreview', createRestaurantReviewRouter)
app.use('/ordereview', createOrderReviewRouter)
app.use('/driverreview', createDriverReviewRouter)
app.use('/driverorder', createdriverearningRouter)
app.use('/payoutadmin', createPayoutRouter)
app.use('/payment', createPaymentRouter)

// view image from uploads folder
app.use('/restaurantlogo', express.static('restaurantlogo'));
app.use('/foodmenu', express.static('foodmenu'));
app.use('/transactionImage', express.static('transactionImage'));
app.use('/userprofile', express.static(path.join(__dirname, 'userprofile')));

// 
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.get('/test',(req,res)=>{
    res.send("Test done")
})

app.listen(port,()=>{
    console.log(`Server is running on: http://localhost:${port}`)
})