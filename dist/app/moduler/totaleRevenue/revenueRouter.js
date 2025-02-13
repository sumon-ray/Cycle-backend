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
exports.totalPriceRevenue = void 0;
const order_model_1 = require("../create-order/order-model");
// totale revenue controler
const getTotalRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totaleRevenue = yield order_model_1.OrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                },
            },
        ]);
        res.status(200).json({
            message: 'Revenue calculated successfully',
            success: true,
            data: totaleRevenue,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.totalPriceRevenue = {
    getTotalRevenue,
};
