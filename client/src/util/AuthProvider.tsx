import { createContext, useEffect, useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { isValidToken } from './isValidToken';
import { useHistory } from 'react-router';

import { Me as IMe } from '../generated/types';

interface IAuthContext {
  accessToken: string | null;
  refreshToken: string | null;
  user: IMe | null;
}

const initialAuthContext: IAuthContext = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authContext = createContext(initialAuthContext);
export const AuthProvider = authContext.Provider;

const ME_QUERY = gql`
  query MeQuery {
    me {
      _id
      email
    }
  }
`;

const REQUEST_NEW_ACCESS_TOKEN_QUERY = gql`
  query RequestNewAccessToken($refreshToken: String!) {
    renewAccessToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

export const useAuthContext = (): IAuthContext => {
  const history = useHistory();
  const [user, setUser] = useState<IMe | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(
    sessionStorage.getItem('access-token') || null
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refresh-token') || null
  );

  const { loading, data, refetch } = useQuery(ME_QUERY);

  const [
    renewAccessToken,
    { loading: accessTokenLoading, data: accessTokenData },
  ] = useLazyQuery(REQUEST_NEW_ACCESS_TOKEN_QUERY, {
    variables: { refreshToken },
  });

  useEffect(() => {
    if (loading || !data) return;

    const meQueryResult: IMe = data.me;

    if (!data?._id) {
      const isValidRefeshToken = isValidToken(refreshToken, 'refresh');

      // todo redirect user to login page
      // todo remove tokens from storage?
      if (!refreshToken || !isValidRefeshToken) {
        console.log('no tokens');
        history.push('/login');
        return;
      }
      renewAccessToken();
    }

    setUser(meQueryResult);
  }, [loading, data, refreshToken, renewAccessToken, history]);

  // If new access token is returned from the server, save token to session storage
  useEffect(() => {
    if (accessTokenLoading) return;

    const newAccessToken = accessTokenData?.renewAccessToken?.accessToken;
    if (!newAccessToken) {
      return;
    }

    setAccessToken(newAccessToken);
    sessionStorage.setItem('access-token', newAccessToken);
  }, [accessTokenLoading, accessTokenData]);

  useEffect(() => {
    const isAccessTokenValid = isValidToken(accessToken, 'access');

    if (!isAccessTokenValid) {
      return;
    }

    if (!user && isAccessTokenValid) {
      refetch();
    }
  }, [accessToken, user, refetch]);

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const useUser = () => {
  const { user } = useAuthContext();

  return { user, isAuthenticated: !!user };
};
