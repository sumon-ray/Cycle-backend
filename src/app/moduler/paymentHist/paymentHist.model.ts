import { model, Schema } from 'mongoose';
import { TOrderDetails } from './paymentHist.interace';

const orderSchema = new Schema<TOrderDetails>(
  {
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'create-cycle',
    },
    queantity: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const orderModel = model<TOrderDetails>('order', orderSchema);
