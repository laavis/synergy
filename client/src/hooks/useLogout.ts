import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { LOGIN_PATH } from '../constants/paths';

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const useLogout = () => {
  const [logoutMutation] = useMutation(LOGOUT);

  const history = useHistory();

  const logout = useCallback(async () => {
    try {
      await logoutMutation();
      localStorage.clear();
      sessionStorage.clear();
      history.push(LOGIN_PATH);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }, [logoutMutation, history]);

  return { logout };
};
