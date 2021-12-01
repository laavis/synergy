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

  const tokens = await TokenPairModel.findOne({ userId });

  if (!tokens) {
    return;
  }

  const isLegitRefreshToken = refreshToken === tokens.refreshToken;

  if (!isLegitRefreshToken) {
    // no time to handle
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
