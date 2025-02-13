import express from 'express';
import { orderControl } from './paymentHist.controler';
import adminTokenVerify from '../auth/adminverifytoken';

const router = express.Router();

router.post('/', orderControl.createOrderControl);
router.get('/getOrder/:email', orderControl.manageOrder);
router.get('/getAllOrder', orderControl.getAllOrderControler);
router.put(
  '/changeStatus',
  adminTokenVerify,
  orderControl.orderChangeStatusControler,
);
export const orderPaymentRouter = { router };
