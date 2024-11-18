const Booking = require('../models/booking.model.js')
const Hotel = require('../models/hotel.model.js')
const moment = require('moment')

exports.updateHotelAvailable = async () =>{
    let today = moment().format();    
    today = JSON.stringify(today)
    today = today.split('T')[0]
    today = today.split('"')[1]
    today = today.split('-').reverse().join('-').replaceAll('-','/')

     let bookings = await Booking.find({checkout :{ $eq : today}})
 
     bookings.map(async (booking) => {
        let hotel = await Hotel.findById(booking.hotelId)
        if(hotel &&  hotel.available){
         hotel.available +=   1
         await hotel.save()  
        }
     }) 
}