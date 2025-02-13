import mongoose from 'mongoose';

export type TOrderDetails = {
  address: string;
  amount: number;
  city: string;
  email: string;
  name: string;
  product: mongoose.Schema.Types.ObjectId;
  queantity: number;
  user: string;
  zip: string;
  status: 'pending' | 'progress';
};
