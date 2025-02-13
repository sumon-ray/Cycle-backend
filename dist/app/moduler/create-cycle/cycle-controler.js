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
exports.cycle = void 0;
// import { CreateCycle } from "./cycle-interface";
const cycle_services_1 = require("./cycle-services");
const cycle_model_1 = require("./cycle-model");
// cycle create controler
const createCycle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cycleData = req.body;
        const result = yield cycle_services_1.cycleServicesFun.createCycleServicesFun(cycleData);
        res.status(200).json({
            message: 'Bicycle created successfully',
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// get all cycle controler
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const getProduct = yield cycle_services_1.cycleServicesFun.getAllProductServices(query);
        res.status(200).json({
            message: 'Bicycles retrieved successfully',
            success: true,
            data: getProduct,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllProductControler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getProduct = yield cycle_model_1.CycleModel.find();
        res.status(200).json({
            message: 'Bicycles retrieved successfully',
            success: true,
            data: getProduct,
        });
    }
    catch (err) {
        next(err);
    }
});
// get specficic cycle controler
const getCycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getId = req.params.productId;
        const getSpecficIdCycle = yield cycle_services_1.cycleServicesFun.getCycleByIdServices(getId);
        res.status(200).json({
            message: 'Bicycles retrieved successfully',
            success: true,
            data: getSpecficIdCycle,
        });
    }
    catch (err) {
        next(err);
    }
});
// cycle update controler
const updateCyclebyId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getId = req.params.productId;
        const upDatas = req.body;
        const getUpdateResult = yield cycle_services_1.cycleServicesFun.cycleDetailsUpdate(getId, upDatas);
        res.status(200).json({
            message: 'Bicycle updated successfully',
            success: true,
            data: getUpdateResult,
        });
    }
    catch (err) {
        next(err);
    }
});
// cycle delete controler
const deleteCycleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getIdDelete = req.params.productId;
        const getResult = yield cycle_services_1.cycleServicesFun.deleteCycle(getIdDelete);
        if (getResult.deletedCount < 1) {
            res.status(200).json({
                message: 'Bicycle Not Found',
                success: false,
                data: {},
            });
        }
        res.status(200).json({
            message: 'Bicycle deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (err) {
        next(err);
    }
});
exports.cycle = {
    createCycle,
    getAllProduct,
    getCycleById,
    updateCyclebyId,
    deleteCycleById,
    getAllProductControler,
};
