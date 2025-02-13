import { NextFunction, Request, Response } from 'express';
import { userModel } from '../users/user.model';
import bcrypt from 'bcrypt';
import { tokenGen } from './generateToken';

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email: email });
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

    const result = await bcrypt.compare(password, findUser.password);
    if (result) {
      const token = await tokenGen({
        role: findUser.role,
        email: findUser.email,
      });
      res.status(200).json({
        status: '200',
        success: true,
        message: 'Login Successfully',
        token: token,
      });
    } else {
      res.status(401).json({
        status: '401',
        success: false,
        message: 'Unauthorized User',
      });
    }
  } catch (err) {
    next(err);
  }
};

export const authUser = {
  loginUser,
};
