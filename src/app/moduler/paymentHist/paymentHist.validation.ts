import { z } from 'zod';

export const orderSchema = z.object({
  address: z.string().min(1, { message: 'Address is required' }),
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  city: z.string().min(1, { message: 'City is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(1, { message: 'Name is required' }),
  product: z.string().refine((val) => val.match(/^[0-9a-fA-F]{24}$/), {
    message: 'Product ID must be a valid ObjectId',
  }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  user: z.string().email({ message: 'Invalid user email' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  status: z.string().default('pending').optional(),
});
