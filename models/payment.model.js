const {Schema, default: mongoose} = require('mongoose')
const User = require('./user.model')
const Hotel = require('./hotel.model')



const paymentSchema = new Schema({
    statue:{
        type:String,
        reuired: true,
        default: 'pending'
    },
    paymentId:{
        type:String
    },
    totalAmount:{
        type:String
    },
    hotelId: {
        type:mongoose.Schema.Types.ObjectId ,
        ref:Hotel
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId ,
        ref:User
    }
},{timestamps:true})

const Payment = mongoose.model('Payment',paymentSchema)

module.exports = Payment 