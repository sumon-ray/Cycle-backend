"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controler_1 = require("./user.controler");
const userValidation_1 = __importDefault(require("../../middleware/userValidation"));
const adminverifytoken_1 = __importDefault(require("../auth/adminverifytoken"));
const router = express_1.default.Router();
router.post('/', userValidation_1.default, user_controler_1.userControl.createUsersControler);
router.get('/singalUser/:email', user_controler_1.userControl.getSingaluserControler);
router.post('/changeName', user_controler_1.userControl.changeNameControler);
router.get('/getAllUser', user_controler_1.userControl.getAllusersControler);
router.patch('/changePassword', user_controler_1.changePasswordUser);
router.patch('/changeStatus', adminverifytoken_1.default, user_controler_1.userControl.changeStatusControler);
exports.userRoute = {
    router,
};
