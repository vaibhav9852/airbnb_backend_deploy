const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')



exports.authenticate = async (req,res,next) =>{
    let token = req.headers['authorization']?.split(' ')[1] || req.headers['authorization']
  
    if(!token){
      res.status(403).json({success:false,message:'Token is required'}) 
    }else{
    try{
        const {JWT_SECRET} = process.env 
      let payload = await  jwt.verify(token,JWT_SECRET)
      let user = await User.findOne({email:payload.email})
      req.user = user
   
      next();
    }catch(err){
        res.status(500).json({success:false,message:'Internal server error while authenticate'})
    }
  
}
}


exports.admin = async (req,res,next) =>{
    try{
    
      if(req?.user?.role == 'admin'){
      
        next();
      }else{
        res.status(403).json({success:false,message:'admin role required'})
      }
    }catch(err){
      res.status(500).json({success:false,message:'Internal server error while admin check'})
    } 
}




