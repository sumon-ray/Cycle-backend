"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cycle_router_1 = require("./app/moduler/create-cycle/cycle-router");
const user_router_1 = require("./app/moduler/users/user.router");
const zod_1 = require("zod");
const usetAuthRouter_1 = require("./app/moduler/auth/usetAuthRouter");
const payment_route_1 = require("./app/moduler/payment/payment-route");
const paymentHist_router_1 = require("./app/moduler/paymentHist/paymentHist.router");
const app = (0, express_1.default)();
// JSON body parser and url-encoded middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS middleware
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
// Router connection middleware
app.use('/api/products', cycle_router_1.cycleRouter.router);
app.use('/api/createUser', user_router_1.userRoute.router);
app.use('/api/login', usetAuthRouter_1.auth.router);
app.use('/api/create-payment', payment_route_1.paymentRouter.router);
app.use('/api/create-order', paymentHist_router_1.orderPaymentRouter.router);
// demo router for testing
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World',
        success: true,
        data: 'Welcome Our Site',
    });
});
// global generic error handel middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((err, req, res, next) => {
    const isValidationError = err.name === 'ValidationError';
    const statusCode = isValidationError ? 400 : err.statusCode || 500;
    // Extract ZodError messages if the error is an instance of ZodError
    let zodErrors = [];
    if (err instanceof zod_1.ZodError) {
        zodErrors = err.errors.map((item) => `${item.message} at ${item.path.join('.')}`);
    }
    const errorResponse = {
        message: isValidationError
            ? 'Validation failed'
            : zodErrors.length > 0
                ? zodErrors.join('; ')
                : err.message || 'An unexpected error occurred',
        success: false,
        error: isValidationError ? err : { name: err.name || 'Error' },
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    };
    res.status(statusCode).json(errorResponse);
});
exports.default = app;
