import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.services';
import { userModel } from './user.model';

const createUsersControler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const respondSend = await userServices.createUserServices(req.body);
    res.status(respondSend.statusCode).json({
      message: respondSend.message,
      status: respondSend.statusCode,
    });
  } catch (err) {
    next(err);
  }
};

const getSingaluserControler: RequestHandler = async (req, res, next) => {
  try {
    const result = await userServices.getSingaUserServices(req.params.email);
    res.status(202).json({
      message: 'Get user Succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const changeNameControler: RequestHandler = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const result = await userModel.updateOne(
      { email },
      { $set: { name: name } },
      { new: true },
    );
    res.status(202).json({
      message: 'Get user Succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllusersControler: RequestHandler = async (req, res, next) => {
  try {
    const result = await userServices.getAllUsersServices();
    res.status(202).json({
      message: 'Get user Succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const changeStatusControler: RequestHandler = async (req, res, next) => {
  try {
    const { status } = req.body;

    const result = await userModel.findByIdAndUpdate(
      { _id: status.userId },
      { $set: { status: status.status } },
    );
    res.status(202).json({
      message: 'User Update Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const changePasswordUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await userServices.changePasswordServices(req.body);
    res.status(202).json({
      message: 'User Update Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControl = {
  createUsersControler,
  getSingaluserControler,
  changeNameControler,
  getAllusersControler,
  changeStatusControler,
};
