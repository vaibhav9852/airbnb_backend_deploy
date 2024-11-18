
const express = require('express')
const { createBooking, getBookings, getBooking } = require('../controllers/booking.controller');
const { authenticate, admin } = require('../middlewares/auth.middleware');
const router = express.Router()


router.post('/',authenticate,  createBooking)

router.get('/',authenticate, admin, getBookings)  

router.get('/:id',authenticate, getBooking)  

module.exports = router ;  