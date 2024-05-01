require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const db = require('./db')


// Define all Router


const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT

// Define Routes



// view image from uploads folder
app.use('/uploads', express.static('uploads'));


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