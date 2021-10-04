import { hash } from 'p4ssw0rd';
import { UserModel } from '../../models/User';

export interface ICreateUser {
  email: string;
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
}

export const create = async (args: ICreateUser) => {
  const { email, password, rePassword, firstName, lastName } = args;
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    console.log('email exists');
    return;
  }

  if (password !== rePassword) {
    console.log('passwords no not match');
    return;
  }

  const hashedPassword = hash(password);
  const newUser = await UserModel.create({ email, password: hashedPassword, firstName, lastName });

  return newUser;
};
