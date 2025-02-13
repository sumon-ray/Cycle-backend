import express from 'express';
import { paymentControler } from './payment-controler';

const router = express.Router();

router.post('/', paymentControler.createPayment);

export const paymentRouter = {
  router,
};
