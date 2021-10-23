import { verify, sign } from 'jsonwebtoken';
import { TokenPairModel } from '../models/Token';
import { IUser, UserModel } from '../models/User';

export interface ITokenPayload {
  _id: string;
}

export const createAccessToken = (user: IUser) => {
  const { _id } = user;

  const accessToken = sign(
    { user: { _id } },
    process.env.ACCESS_SECRET as string,
    {
      expiresIn: '10m',
    }
  );

  return accessToken;
};

export const createRefreshToken = (user: IUser) => {
  const { _id, email } = user;
  const refreshToken = sign(
    { user: { _id, email } },
    process.env.REFRESH_SECRET as string,
    {
      expiresIn: '7d',
    }
  );

  return refreshToken;
};

export const saveTokens = async (
  accessToken: string,
  refreshToken: string,
  userId: string
) =>
  await TokenPairModel.create({
    accessToken,
    refreshToken,
    userId,
  });

export const validateAccessToken = async (req: any) => {
  try {
    if (!req.headers.authorization) return null;
    const [_, accessToken] = req.headers.authorization.split(' ');
    if (!accessToken) return null;

    const payload = verify(accessToken, process.env.ACCESS_SECRET as string);

    // @ts-ignore
    const userId = payload.user._id;

    const user = await UserModel.findById({ _id: userId });
    return user;
  } catch (error) {
    // console.log(error);

    return null;
  }
};
