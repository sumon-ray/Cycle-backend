"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.orderModel = (0, mongoose_1.model)('order', orderSchema);
