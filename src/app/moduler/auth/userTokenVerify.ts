import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config/config';

interface DecodedToken extends JwtPayload {
  role: string;
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

  jwt.verify(token, config.token_secrate as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    const decodedToken = decoded as DecodedToken;

    if (decodedToken.role === 'customer') {
      next();
    } else {
      res
        .status(403)
        .json({ message: 'Forbidden: You do not have the required role' });
    }
  });
};

export default adminTokenVerify;
