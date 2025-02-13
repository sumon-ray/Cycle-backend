import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config/config';
import { userModel } from '../users/user.model';

interface DecodedToken extends JwtPayload {
  role: string;
  email: string; // Assuming you want to use the email from the token
}

const adminTokenVerify = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  jwt.verify(token, config.token_secrate as string, async (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    const decodedToken = decoded as DecodedToken;
    const findUser = await userModel.findOne({ email: decodedToken.email });

    if (!findUser) {
      // If user is not found, respond with an error
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Now we know findUser is not null
    if (decodedToken.role === findUser.role) {
      next();
    } else {
      res
        .status(403)
        .json({ message: 'Forbidden: You do not have the required role' });
    }
  });
};

export default adminTokenVerify;
