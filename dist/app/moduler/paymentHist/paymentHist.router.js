"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPaymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const paymentHist_controler_1 = require("./paymentHist.controler");
const adminverifytoken_1 = __importDefault(require("../auth/adminverifytoken"));
const router = express_1.default.Router();
router.post('/', paymentHist_controler_1.orderControl.createOrderControl);
router.get('/getOrder/:email', paymentHist_controler_1.orderControl.manageOrder);
router.get('/getAllOrder', paymentHist_controler_1.orderControl.getAllOrderControler);
router.put('/changeStatus', adminverifytoken_1.default, paymentHist_controler_1.orderControl.orderChangeStatusControler);
exports.orderPaymentRouter = { router };
