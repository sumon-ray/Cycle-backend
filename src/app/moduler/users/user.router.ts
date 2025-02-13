import express from 'express';
import { changePasswordUser, userControl } from './user.controler';
import userValidation from '../../middleware/userValidation';
import adminTokenVerify from '../auth/adminverifytoken';

const router = express.Router();

router.post('/', userValidation, userControl.createUsersControler);
router.get('/singalUser/:email', userControl.getSingaluserControler);
router.post('/changeName', userControl.changeNameControler);
router.get('/getAllUser', userControl.getAllusersControler);
router.patch('/changePassword', changePasswordUser);
router.patch(
  '/changeStatus',
  adminTokenVerify,
  userControl.changeStatusControler,
);
export const userRoute = {
  router,
};
