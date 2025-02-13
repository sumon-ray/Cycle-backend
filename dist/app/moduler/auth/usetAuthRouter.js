"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = __importDefault(require("express"));
const userAuthControler_1 = require("./userAuthControler");
const router = express_1.default.Router();
router.post('/', userAuthControler_1.authUser.loginUser); // No changes needed here
exports.auth = {
    router,
};
