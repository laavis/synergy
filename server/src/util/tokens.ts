import { verify, sign } from 'jsonwebtoken';
import { hash } from 'p4ssw0rd';
import { TokenPairModel } from '../models/Token';
import { IUser } from '../models/User';

//
// Access
export const createAccessToken = (user: IUser) => {
  const { _id, email } = user;
  const accessToken = sign({ user: { _id, email } }, process.env.ACCESS_SECRET, {
    expiresIn: '10m',
  });

  return accessToken;
};

//
// Refresh
export const createRefreshToken = (user: IUser) => {
  const { _id, email } = user;
  const refreshToken = sign({ user: { _id, email } }, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return refreshToken;
};

export const saveTokens = async (accessToken: string, refreshToken: string, userId: string) => {
  const hashedAccessToken = hash(accessToken);
  const hashedRefreshToken = hash(refreshToken);

  await TokenPairModel.create({ accessToken: hashedAccessToken, refreshToken: hashedRefreshToken, userId });
};

export const generateAccessToken = (refreshToken: string) => {
  if (!refreshToken) {
    console.log('no refresh token!');
    return;
  }
  const hashedRefreshToken = hash(refreshToken);

  // query valid refresh token from db
  const existingRefreshToken = TokenPairModel.findOne({ refreshToken: hashedRefreshToken });

  if (!existingRefreshToken) {
    console.log('no token in db');
    return;
  }

  console.log(existingRefreshToken);

  const payload = verify(refreshToken, process.env.REFRESH_SECRET);
  console.log(payload);

  // return accessToken;
};

export const validateToken = (token: string, secret: string) => {
  try {
    return verify(token, secret);
  } catch (error) {
    console.error(error);
    return null;
  }
};
