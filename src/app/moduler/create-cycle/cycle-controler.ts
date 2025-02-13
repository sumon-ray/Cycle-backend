import { NextFunction, Request, Response } from 'express';
// import { CreateCycle } from "./cycle-interface";
import { cycleServicesFun } from './cycle-services';
import { CycleModel } from './cycle-model';
// cycle create controler
const createCycle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cycleData = req.body;
    const result = await cycleServicesFun.createCycleServicesFun(cycleData);
    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all cycle controler
const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.query;
    const getProduct = await cycleServicesFun.getAllProductServices(query);
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      success: true,
      data: getProduct,
    });
  } catch (err) {
    next(err);
  }
};
const getAllProductControler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getProduct = await CycleModel.find();
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      success: true,
      data: getProduct,
    });
  } catch (err) {
    next(err);
  }
};

// get specficic cycle controler
const getCycleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getId = req.params.productId;
    const getSpecficIdCycle =
      await cycleServicesFun.getCycleByIdServices(getId);
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      success: true,
      data: getSpecficIdCycle,
    });
  } catch (err) {
    next(err);
  }
};

// cycle update controler
const updateCyclebyId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getId = req.params.productId;
    const upDatas = req.body;
    const getUpdateResult = await cycleServicesFun.cycleDetailsUpdate(
      getId,
      upDatas,
    );
    res.status(200).json({
      message: 'Bicycle updated successfully',
      success: true,
      data: getUpdateResult,
    });
  } catch (err) {
    next(err);
  }
};

// cycle delete controler
const deleteCycleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getIdDelete = req.params.productId;
    const getResult = await cycleServicesFun.deleteCycle(getIdDelete);
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
  } catch (err) {
    next(err);
  }
};
export const cycle = {
  createCycle,
  getAllProduct,
  getCycleById,
  updateCyclebyId,
  deleteCycleById,
  getAllProductControler,
};
