import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const RENEW_ACCESS_TOKEN_MUTATION = gql`
  mutation RenewAccessToken($refreshToken: String!) {
    renewAccessToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

export const useLogin = () => {
  const [login, { loading, data, error }] = useMutation(
    RENEW_ACCESS_TOKEN_MUTATION
  );

  useEffect(() => {
    // if (!loading && data) {
    //   // save tokens
    //   const { accessToken, refreshToken } = data.login;
    //   localStorage.setItem('refresh-token', refreshToken);
    //   sessionStorage.setItem('access-token', accessToken);
    // }
  }, [loading, data]);

  useEffect(() => console.error(error), [error]);

  return { login, loading, data };
};
