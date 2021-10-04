import { JwtPayload, verify } from 'jsonwebtoken';
import { check, hash } from 'p4ssw0rd';

import { IUser } from '../../models/User';
import { TokenPairModel } from '../../models/Token';
import { createAccessToken } from '../../util';

const renew = async (refreshToken: string) => {
  const payload = verify(refreshToken, process.env.REFRESH_SECRET) as JwtPayload;
  if (!payload) return;

  const user = payload['user'] as IUser;
  const userId = user._id;

  if (!userId) return;

  const tokens = await TokenPairModel.findOne({ userId });

  if (!tokens) return;

  const isLegitRefreshToken = check(refreshToken, tokens.refreshToken);

  if (!isLegitRefreshToken) {
    console.log('your refresh token shit fam');
    return;
  }

  const newAccessToken = createAccessToken(user);
  const hashedNewAccessToken = hash(newAccessToken);

  const updatedTokens = await tokens.update({ accessToken: hashedNewAccessToken });
  console.log(updatedTokens);

  return newAccessToken;
};

export const accessToken = {
  renew,
};
