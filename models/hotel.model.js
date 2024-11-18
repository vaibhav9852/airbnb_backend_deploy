const {Schema} = require('mongoose')
const mongoose = require('mongoose')

const hotelSchema =  new Schema({
        name:{
            type: String,
            required: true,
            trim : true,
        },
        location:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            trim: true 
        },
        charge:{
            type: String,
            required: true,
            trim: true
        },
        rooms:{
           type : Number,
           default:10
        },
        available:{
          type: Number ,
          default:10
        },

        image:{
            type:[{type:String}]  
        },
        features:{
            type:[{type:String}]
        },
        coordinates:{
            type : [Number]
        }
        
})

const Hotel = mongoose.model('Hotel',hotelSchema)

module.exports = Hotel;  



