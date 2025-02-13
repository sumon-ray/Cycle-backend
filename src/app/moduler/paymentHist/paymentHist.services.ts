import { TOrderDetails } from './paymentHist.interace';
import { orderModel } from './paymentHist.model';

const createOrderServices = async (data: TOrderDetails) => {
  const orders = await orderModel.create(data);
  return orders;
};

export const orderServices = {
  createOrderServices,
};
