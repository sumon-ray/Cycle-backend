import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

type TInfo = {
  role: string;
  email: string;
};

export const tokenGen = async (info: TInfo) => {
  const token = jwt.sign(info, config.token_secrate as string, {
    expiresIn: '2d',
  });
  return token;
};
