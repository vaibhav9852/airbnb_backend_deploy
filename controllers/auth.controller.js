const crypto = require('crypto')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const sendEmail = require('../utils/sendEmail')

exports.forgotPassword = async (req,res) =>{
    let {email} = req.body 
    const FRONTEND_URL = process.env.BASE_URL 
   
     try{
        let user = await User.findOne({email})
          if(!user){
            return res.status(404).json({success:false,message:'User not found'})
          }
        const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

 const origin = req.headers.origin || FRONTEND_URL;
const resetUrl = `${origin}/reset-password/${resetToken}`;
 

  const message = `To reset your password, please click the link: ${resetUrl}`;
           try{
           await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message,
          });
          res.status(200).json({success:true, message: 'Email sent' });
        }catch(error){
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined; 
          await user.save();
            res.status(500).json({success:false,message:'Internal server error while forgot password ',error})
        }

     }catch(error){
     
        res.status(500).json({success:false,message:'Internal server error while forgot password ',error})
     }
}

exports.resetPassword = async (req,res) =>{
    try{
        let {token} = req.params
        let {password} = req.body
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now() },
        });
        
        if (!user) return res.status(400).json({success:false, message: 'Invalid or expired token' });
        let {SALT_ROUND} = process.env
        SALT_ROUND = +SALT_ROUND
         const hashPassword = await bcrypt.hash(password, SALT_ROUND );
        user.password = hashPassword
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined; 
        await user.save();
      
        res.status(200).json({ success:true,message: 'Password reset successfully' });
        

    }catch(error){
       res.status(500).json({success:false,message:'Internal server error while forgot password '})
    }
}