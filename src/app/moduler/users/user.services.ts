import { TUser } from './user.Interface';
import { userModel } from './user.model';
import bcrypt from 'bcrypt';
const createUserServices = async (user: TUser) => {
  const setUser = await userModel.create(user);
  return {
    message: 'user Create successfully',
    statusCode: 202,
    data: setUser,
  };
};

const getSingaUserServices = async (email: string) => {
  const result = await userModel.findOne({ email: email }, { password: 0 });
  return result;
};

const getAllUsersServices = async () => {
  const result = await userModel.find();
  return result;
};

const changePasswordServices = async (info: Record<string, unknown>) => {
  const { email, retypePass, newPass } = info;
  if (retypePass !== newPass) {
    return {
      message: 'Wrong Password',
    };
  }
  const hashPass = await bcrypt.hash(newPass as string, 10);
  const getuser = await userModel.findOne({ email });
  if (!getuser) {
    return {
      message: 'Unauthorize User',
    };
  }

  const updatePass = await userModel.findOneAndUpdate(
    { email },
    { $set: { password: hashPass } },
  );
  return updatePass;
};
export const userServices = {
  createUserServices,
  getSingaUserServices,
  getAllUsersServices,
  changePasswordServices,
};
