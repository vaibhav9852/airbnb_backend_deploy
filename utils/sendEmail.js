const nodemailer = require('nodemailer');



const sendEmail = async (options) =>{
   const {EMAIL,EMAIL_PASSWORD} = process.env
 const transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth:{
        user : EMAIL,
        pass: EMAIL_PASSWORD ,
    },
 })

 const mailoptions = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message, 
 }

  await transporter.sendMail(mailoptions)
}

module.exports = sendEmail