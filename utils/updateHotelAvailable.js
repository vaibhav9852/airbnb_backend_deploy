const Booking = require('../models/booking.model.js')
const Hotel = require('../models/hotel.model.js')


exports.updateHotelAvailable = async () =>{    
   try { 
const today = new Date();
const formattedDate = today.getDate().toString().padStart(2, '0') + '/' + 
                      (today.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                      today.getFullYear(); 
const expiredBookings = await Booking.find({ checkout: { $lte: formattedDate } });
for (const booking of expiredBookings) {
    const { hotelId } = booking;  
    const hotel = await Hotel.findById(hotelId); 
    if (hotel) {        
        if (hotel.available < 10) {
         hotel.available += 1;
          await hotel.save();
        }else if(hotel.available > 10){
         hotel.available = 10
         await hotel.save()
        }
    }
}      
  } catch (error) { 
     console.error('hotel room update error',error)  
  }
    
} 

 