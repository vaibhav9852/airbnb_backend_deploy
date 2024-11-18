const Booking = require("../models/booking.model")
const Hotel = require("../models/hotel.model")
const moment = require("moment")
const sendEmail = require("./sendEmail")

exports.sendMailFromHotel = async () =>{ 
    
    let today = moment().format();    
    today = JSON.stringify(today)
    today = today.split('T')[0]
    today = today.split('"')[1]
    today = today.split('-').reverse().join('-').replaceAll('-','/')



     try{
       
    let bookings = await Booking.find({ checkin : { $eq: today}}).populate('hotelId userId') 
   
    const emailSubject = 'Your Booking Reminder';
    const emailMessage = `Hello, this is a reminder that your booking is today.`;

        bookings.map((booking) => {
              let subject = 'Your Booking Reminder'
              let message = `Hello, this is a reminder that your booking is today in ${booking?.hotelId?.name}`                                   
            
              if(booking?.userId?.email){
            sendEmail({email:booking?.userId?.email , subject , message})
              }
        })
    }catch(err){
        process.exit(1)
    }
}