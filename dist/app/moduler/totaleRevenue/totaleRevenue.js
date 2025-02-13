"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totaleRevenue = void 0;
const express_1 = __importDefault(require("express"));
const revenueRouter_1 = require("./revenueRouter");
const router = express_1.default.Router();
// total revenue get router
router.get('/', revenueRouter_1.totalPriceRevenue.getTotalRevenue);
exports.totaleRevenue = {
    router,
};
