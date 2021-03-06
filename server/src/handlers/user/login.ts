import { ApolloError, UserInputError } from 'apollo-server-errors';
import { check, hash } from 'p4ssw0rd';
import { TokenPairModel } from '../../models/Token';
import { UserModel } from '../../models/User';
import { createAccessToken, createRefreshToken, saveTokens } from '../../util';

export interface ILoginUserInput {
  email: string;
  password: string;
}

export const login = async (input: ILoginUserInput) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new ApolloError('Invalid credentials');
  }

  const verifiedPassword = check(password, user.password);

  if (!verifiedPassword) {
    throw new UserInputError('Invalid credentials');
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  const updatedTokens = await TokenPairModel.findOneAndUpdate(
    { userId: user._id },
    {
      accessToken,
      refreshToken,
    }
  );

  if (!updatedTokens) {
    await TokenPairModel.create({
      accessToken,
      refreshToken,
      userId: user._id,
    });
  }

  return {
    accessToken,
    refreshToken,
  };
};
