import { JwtPayload, verify } from 'jsonwebtoken';
import { check, hash } from 'p4ssw0rd';

import { IUser } from '../../models/User';
import { TokenPairModel } from '../../models/Token';
import { createAccessToken } from '../../util';
import { AuthenticationError } from 'apollo-server-errors';

const renew = async (refreshToken: string) => {
  const payload = verify(
    refreshToken,
    process.env.REFRESH_SECRET ?? ''
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

  const isLegitRefreshToken = check(refreshToken, tokens.refreshToken);

  if (!isLegitRefreshToken) {
    throw new AuthenticationError('Invalid refresh token');
  }

  const newAccessToken = createAccessToken(user);
  const hashedNewAccessToken = hash(newAccessToken);

  const updatedTokens = await tokens.update({
    accessToken: hashedNewAccessToken,
  });

  return newAccessToken;
};

export const accessToken = {
  renew,
};
