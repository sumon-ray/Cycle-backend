import { RequestHandler } from 'express';
import { orderServices } from './paymentHist.services';
import { orderModel } from './paymentHist.model';

const createOrderControl: RequestHandler = async (req, res, next) => {
  try {
    const result = await orderServices.createOrderServices(req.body);
    res.status(200).json({
      success: true,
      message: 'Order Created',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const manageOrder: RequestHandler = async (req, res, next) => {
  try {
    const email = req.params.email;
    const result = await orderModel.find({ user: email }).populate('product');
    res.status(200).json({
      success: true,
      message: 'Order Created',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrderControler: RequestHandler = async (req, res, next) => {
  try {
    const result = await orderModel.find();
    res.status(200).json({
      success: true,
      message: 'all order',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const orderChangeStatusControler: RequestHandler = async (req, res, next) => {
  try {
    const { status, id } = req.body;

    const result = await orderModel.findByIdAndUpdate(
      { _id: id },
      { $set: { status: status } },
    );
    res.status(200).json({
      success: true,
      message: 'all order',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const orderControl = {
  createOrderControl,
  manageOrder,
  getAllOrderControler,
  orderChangeStatusControler,
};
