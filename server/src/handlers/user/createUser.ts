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

export const create = async (input: ICreateUser) => {
  console.log('skdhsd');
  console.log(input);
  const { email, password, rePassword, firstName, lastName } = input;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new ApolloError('User already exists', 'userExists');
  }

  if (password !== rePassword) {
    throw new UserInputError('Passwords do not match', {
      name: 'passwordsMismatch',
    });
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
