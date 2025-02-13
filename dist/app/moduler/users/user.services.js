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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserServices = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const setUser = yield user_model_1.userModel.create(user);
    return {
        message: 'user Create successfully',
        statusCode: 202,
        data: setUser,
    };
});
const getSingaUserServices = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findOne({ email: email }, { password: 0 });
    return result;
});
const getAllUsersServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find();
    return result;
});
const changePasswordServices = (info) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, retypePass, newPass } = info;
    if (retypePass !== newPass) {
        return {
            message: 'Wrong Password',
        };
    }
    const hashPass = yield bcrypt_1.default.hash(newPass, 10);
    const getuser = yield user_model_1.userModel.findOne({ email });
    if (!getuser) {
        return {
            message: 'Unauthorize User',
        };
    }
    const updatePass = yield user_model_1.userModel.findOneAndUpdate({ email }, { $set: { password: hashPass } });
    return updatePass;
});
exports.userServices = {
    createUserServices,
    getSingaUserServices,
    getAllUsersServices,
    changePasswordServices,
};
