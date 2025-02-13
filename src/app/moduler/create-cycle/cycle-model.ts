import { model, Schema } from 'mongoose';
import { CreateCycle } from './cycle-interface';

// crete cycle schema
export const cycleSchema = new Schema<CreateCycle>(
  {
    name: {
      type: String,
      required: [true, 'The bicycle name is required.'],
    },
    brand: {
      type: String,
      required: [true, 'The brand name is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price must be a positive number.'],
    },
    image: {
      type: String,
    },
    queantity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: true,
      validate: {
        validator: function (value) {
          return value;
        },
        message: '{VALUE} is not valid',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// create cycle model
export const CycleModel = model<CreateCycle>('create-cycle', cycleSchema);
