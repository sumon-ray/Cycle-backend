import Stripe from 'stripe';
import { config } from '../../config/config';

const stripe = new Stripe(config.payment_secrate_key as string);

const paymentIntegreat = async () => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50000,
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return paymentIntent;
};

export const paymentServices = {
  paymentIntegreat,
};
