import { JwtPayload, verify } from 'jsonwebtoken';

import { IUser } from '../../models/User';
import { TokenPairModel } from '../../models/Token';
import { createAccessToken } from '../../util';

export const renew = async (refreshToken: string) => {
  const payload = verify(
    refreshToken,
    process.env.REFRESH_SECRET as string
  ) as JwtPayload;

  if (!payload) return;

  const user = payload['user'] as IUser;
  const userId = user._id;

  if (!userId) {
    // todo handle
    console.log('no user id');
  }

  const tokens = await TokenPairModel.findOne({ userId });

  if (!tokens) {
    // todo handle
    console.log('no tokens');
    return;
  }

  const isLegitRefreshToken = refreshToken === tokens.refreshToken;

  if (!isLegitRefreshToken) {
    console.log('asdkjhaskdjhsd');
    // throw new AuthenticationError('Invalid refresh token');
  }

  const newAccessToken = createAccessToken(user);

  await tokens.updateOne({
    accessToken: newAccessToken,
  });

  return { accessToken: newAccessToken };
};

export const accessToken = {
  renew,
};
