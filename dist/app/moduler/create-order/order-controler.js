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
exports.orderControl = void 0;
const order_services_1 = require("./order-services");
// create order controler
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productInfo = req.body;
        const orderrResult = yield order_services_1.orderServices.orderCheckandCreate(productInfo);
        res.status(200).json({
            message: orderrResult === null || orderrResult === void 0 ? void 0 : orderrResult.message,
            success: orderrResult === null || orderrResult === void 0 ? void 0 : orderrResult.success,
            data: orderrResult === null || orderrResult === void 0 ? void 0 : orderrResult.data,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.orderControl = {
    createOrder,
};
