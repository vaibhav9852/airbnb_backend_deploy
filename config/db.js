const mongoose = require('mongoose')

async function connectToDB(){
    const {MONGO_URI} = process.env;
    try{
  let dbInstance =    await mongoose.connect(MONGO_URI)
  console.log('db connected')
    }catch(error){
       process.exit(1)
    }
}

module.exports = connectToDB;