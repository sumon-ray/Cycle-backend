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
exports.authUser = void 0;
const user_model_1 = require("../users/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("./generateToken");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findUser = yield user_model_1.userModel.findOne({ email: email });
        if (!findUser) {
            // Send response if user not found
            res.status(404).json({
                status: '404',
                success: false,
                message: 'User Not Found',
            });
            return;
        }
        if (findUser.role === 'block') {
            res.status(403).json({
                status: '403',
                success: false,
                message: 'User Is Blocked',
            });
            return;
        }
        const result = yield bcrypt_1.default.compare(password, findUser.password);
        if (result) {
            const token = yield (0, generateToken_1.tokenGen)({
                role: findUser.role,
                email: findUser.email,
            });
            res.status(200).json({
                status: '200',
                success: true,
                message: 'Login Successfully',
                token: token,
            });
        }
        else {
            res.status(401).json({
                status: '401',
                success: false,
                message: 'Unauthorized User',
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.authUser = {
    loginUser,
};
