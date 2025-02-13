"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    address: zod_1.z.string().min(1, { message: 'Address is required' }),
    amount: zod_1.z.number().min(0, { message: 'Amount must be a positive number' }),
    city: zod_1.z.string().min(1, { message: 'City is required' }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    product: zod_1.z.string().refine((val) => val.match(/^[0-9a-fA-F]{24}$/), {
        message: 'Product ID must be a valid ObjectId',
    }),
    quantity: zod_1.z.number().min(1, { message: 'Quantity must be at least 1' }),
    user: zod_1.z.string().email({ message: 'Invalid user email' }),
    zip: zod_1.z.string().min(1, { message: 'Zip is required' }),
    status: zod_1.z.string().default('pending').optional(),
});
