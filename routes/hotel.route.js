const express = require('express')
const multer = require('multer')
const { addHotel,getHotels , getHotel, deleteHotel, updateHotel, getHotelsForAdmin } = require('../controllers/hotel.controller')
const { admin,authenticate  } = require('../middlewares/auth.middleware')

const router = express.Router()
const upload = multer({dest:'uploads/'})

router.post('/',authenticate,admin,upload.array('photos'),addHotel)  

router.get('/',getHotels) 

router.get('/all',authenticate,admin,getHotelsForAdmin) 

router.get('/:id',getHotel) 

router.put('/:id',authenticate,admin,upload.array('photos'),updateHotel)

router.delete('/:id',authenticate,admin,deleteHotel)





module.exports = router  

