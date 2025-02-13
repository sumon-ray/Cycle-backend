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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const user_model_1 = require("../users/user.model");
const adminTokenVerify = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    jsonwebtoken_1.default.verify(token, config_1.config.token_secrate, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        const decodedToken = decoded;
        const findUser = yield user_model_1.userModel.findOne({ email: decodedToken.email });
        if (!findUser) {
            // If user is not found, respond with an error
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Now we know findUser is not null
        if (decodedToken.role === findUser.role) {
            next();
        }
        else {
            res
                .status(403)
                .json({ message: 'Forbidden: You do not have the required role' });
        }
    }));
};
exports.default = adminTokenVerify;
