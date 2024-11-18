const Payment = require("../models/payment.model");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.payment = async (req,res) =>{
     const {userId,hotelId,totalAmount} = req.body


  
     try{
      if(userId && hotelId && totalAmount){
  const paymentIntent = await stripe.paymentIntents.create({
    amount: +`${totalAmount}.00`,
    currency: "INR",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  let payment = await Payment.create({statue:'complete',userId,hotelId,totalAmount,paymentId:paymentIntent.id})

  res.send({
    clientSecret: paymentIntent.client_secret,
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    paymentId : payment._id
  });
}else{
  throw new Error('Invalid data')
}
}catch(err){

  res.status(500).json({sucess:false,message:'Internal server error'})
}

}