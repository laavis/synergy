import { decode } from 'jsonwebtoken';

export const isValidToken = (
  token: string | null,
  tokenType: string
): boolean => {
  if (!token) return false;

  const decodedToken = decode(token, { complete: true });
  if (!decodedToken) return false;

  const { exp } = decodedToken.payload;
  if (!exp) return false;

  const tokenExpired = exp * 1000 < new Date().getTime();

  return !tokenExpired;
};
