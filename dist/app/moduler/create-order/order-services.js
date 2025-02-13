"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const cycle_model_1 = require("../create-cycle/cycle-model");
const order_model_1 = require("./order-model");
// create order anc check queantity and isStock
const orderCheckandCreate = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity, email } = orderData;
    const cycleget = yield cycle_model_1.CycleModel.findById({ _id: product });
    // check cycle have or not
    if (!cycleget) {
        return {
            message: 'Cycle Not Fount',
            success: false,
            data: {},
        };
    }
    // check cycle quantity have or not
    if (cycleget.quantity === 0) {
        const updateQueantity = yield cycle_model_1.CycleModel.findByIdAndUpdate({ _id: product }, { $set: { inStock: false } }, { new: true });
        return {
            message: 'Insufficient stock',
            success: false,
            data: updateQueantity,
        };
    }
    // check cycle quantity have or not
    if (quantity > 0) {
        const lessInStock = (cycleget === null || cycleget === void 0 ? void 0 : cycleget.quantity) - quantity;
        yield cycle_model_1.CycleModel.findByIdAndUpdate({ _id: product }, { $set: { quantity: lessInStock } }, { new: true });
        const createOrders = new order_model_1.OrderModel({
            product,
            quantity,
            email,
            totalPrice: cycleget.price,
        });
        const result = yield createOrders.save();
        return {
            message: 'Order created successfully',
            success: true,
            data: result,
        };
    }
});
exports.orderServices = {
    orderCheckandCreate,
};
