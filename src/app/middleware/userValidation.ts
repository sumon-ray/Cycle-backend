import { NextFunction, Request, Response } from 'express';
import { validation } from '../moduler/users/user.Validation';

const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await validation.userValidation.parseAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export default userValidation;
