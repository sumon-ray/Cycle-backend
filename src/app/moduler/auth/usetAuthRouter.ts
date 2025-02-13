import express from 'express';
import { authUser } from './userAuthControler';

const router = express.Router();

router.post('/', authUser.loginUser); // No changes needed here

export const auth = {
  router,
};
