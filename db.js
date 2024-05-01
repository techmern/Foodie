require ('dotenv').config()

// const { error } = require('jquery')
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL)

mongoose.connection.on('connected',()=>{
    console.log("connected to MongoDB")
})

mongoose.connection.on('error',(error)=>{
    console.error("Error is ",error)
})

module.exports = mongoose;