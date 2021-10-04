import { ApolloError, UserInputError } from 'apollo-server-errors';
import { hash } from 'p4ssw0rd';
import { UserModel } from '../../models/User';

export interface ICreateUser {
  email: string;
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
}

export const signup = async (args: ICreateUser) => {
  const { email, password, rePassword, firstName, lastName } = args;
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new ApolloError('User already exists');
  }

  if (password !== rePassword) {
    throw new UserInputError('Passwords do not match')!;
  }

  if (!firstName) {
    return new UserInputError('First name is required');
  }

  if (!lastName) {
    throw new UserInputError('Last name is required');
  }

  const hashedPassword = hash(password);
  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  return newUser;
};
