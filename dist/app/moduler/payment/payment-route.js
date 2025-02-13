"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const payment_controler_1 = require("./payment-controler");
const router = express_1.default.Router();
router.post('/', payment_controler_1.paymentControler.createPayment);
exports.paymentRouter = {
    router,
};
