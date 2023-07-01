// razorpayRoutes.js
import express from 'express';
import { razorpayKey, razorpaySecret } from './config';
import Razorpay from 'razorpay';
import userModel from './models/user.model'

const router = express.Router();

const razorpay = new Razorpay({
  key_id: razorpayKey,
  key_secret: razorpaySecret,
});

router.post('/payment', async (req, res) => {

    const { userID } = req.body;

    const userdata = await userModel.findOne({_id:userID})
    

  try {

    const payment = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      receipt,
    });

    res.json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while creating the payment' });
  }
});

export default router;
