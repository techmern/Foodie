const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    drivername:{
        type:String,
    },
    emailid:{
        type:String,
    },
    password:{
        type:String,
    },
    phone_no:{
        type:String,
    },
    city:{
        type:String,
    },
    license_no:{
        type:String,
    },
    vehicle_type:{
        type:String,
    },
})

// module.exports = mongoose.model('driver',driverSchema)
module.exports = mongoose.models.driver || mongoose.model('driver', driverSchema);
