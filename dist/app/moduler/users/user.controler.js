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
exports.userControl = exports.changePasswordUser = void 0;
const user_services_1 = require("./user.services");
const user_model_1 = require("./user.model");
const createUsersControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respondSend = yield user_services_1.userServices.createUserServices(req.body);
        res.status(respondSend.statusCode).json({
            message: respondSend.message,
            status: respondSend.statusCode,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSingaluserControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getSingaUserServices(req.params.email);
        res.status(202).json({
            message: 'Get user Succesfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const changeNameControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const result = yield user_model_1.userModel.updateOne({ email }, { $set: { name: name } }, { new: true });
        res.status(202).json({
            message: 'Get user Succesfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllusersControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.getAllUsersServices();
        res.status(202).json({
            message: 'Get user Succesfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const changeStatusControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const result = yield user_model_1.userModel.findByIdAndUpdate({ _id: status.userId }, { $set: { status: status.status } });
        res.status(202).json({
            message: 'User Update Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const changePasswordUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.userServices.changePasswordServices(req.body);
        res.status(202).json({
            message: 'User Update Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.changePasswordUser = changePasswordUser;
exports.userControl = {
    createUsersControler,
    getSingaluserControler,
    changeNameControler,
    getAllusersControler,
    changeStatusControler,
};
