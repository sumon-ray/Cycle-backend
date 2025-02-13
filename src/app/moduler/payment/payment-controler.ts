// This is your test secret API key.
import Stripe from 'stripe';
import { config } from '../../config/config';
import { RequestHandler } from 'express';

const stripe = new Stripe(config.payment_secrate_key as string);

const createPayment: RequestHandler = async (req, res, next) => {
  try {
    const { price } = req.body;
    const amount = Number(price * 1000);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',

      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

export const paymentControler = {
  createPayment,
};
