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

  if (!user) return 'nope';

  const verifiedPassword = check(password, user.password);

  if (!verifiedPassword) {
    console.log('!verifiedPassword');
    return;
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  const updatedTokens = await TokenPairModel.findOneAndUpdate(
    { userId: user._id },
    {
      accessToken: hash(accessToken),
      refrshToken: hash(refreshToken),
    }
  );

  if (!updatedTokens) saveTokens(accessToken, refreshToken, user._id);

  return {
    accessToken,
    refreshToken,
  };
};
