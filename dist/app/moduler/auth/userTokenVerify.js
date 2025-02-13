"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const adminTokenVerify = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    jsonwebtoken_1.default.verify(token, config_1.config.token_secrate, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        const decodedToken = decoded;
        if (decodedToken.role === 'customer') {
            next();
        }
        else {
            res
                .status(403)
                .json({ message: 'Forbidden: You do not have the required role' });
        }
    });
};
exports.default = adminTokenVerify;
