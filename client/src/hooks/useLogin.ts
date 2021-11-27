import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const useLogin = () => {
  const [login, { loading, data }] = useMutation(LOGIN);
  const history = useHistory();

  useEffect(() => {
    if (!loading && data) {
      // save tokens
      const { accessToken, refreshToken } = data.login;

      localStorage.setItem('refresh-token', refreshToken);
      sessionStorage.setItem('access-token', accessToken);

      history.push('/project-board');
    }
  }, [loading, data, history]);

  return { login, loading, data };
};
