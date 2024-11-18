const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const User = require('./user.model')
const Hotel = require('./hotel.model')
const Payment = require('./payment.model')

const bookingSchema = new Schema({
    adult:{
       type: String,
    },
    children:{
    type:String
    },
    checkin:{
       type: String
    },
    checkout:{
        type:String
    },
    totalAmount:{
        type:String
    },
    userId : {type: mongoose.Schema.Types.ObjectId , ref:User},
    hotelId : {type: mongoose.Schema.Types.ObjectId , ref:Hotel},
    paymentId : {type: mongoose.Schema.Types.ObjectId , ref: Payment}
},{timestamps : true})

const Booking = mongoose.model('Booking',bookingSchema)

module.exports = Booking 



