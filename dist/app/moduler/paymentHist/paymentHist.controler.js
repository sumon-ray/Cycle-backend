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
const paymentHist_services_1 = require("./paymentHist.services");
const paymentHist_model_1 = require("./paymentHist.model");
const createOrderControl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield paymentHist_services_1.orderServices.createOrderServices(req.body);
        res.status(200).json({
            success: true,
            message: 'Order Created',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const manageOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const result = yield paymentHist_model_1.orderModel.find({ user: email }).populate('product');
        res.status(200).json({
            success: true,
            message: 'Order Created',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllOrderControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield paymentHist_model_1.orderModel.find();
        res.status(200).json({
            success: true,
            message: 'all order',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const orderChangeStatusControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, id } = req.body;
        const result = yield paymentHist_model_1.orderModel.findByIdAndUpdate({ _id: id }, { $set: { status: status } });
        res.status(200).json({
            success: true,
            message: 'all order',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.orderControl = {
    createOrderControl,
    manageOrder,
    getAllOrderControler,
    orderChangeStatusControler,
};
