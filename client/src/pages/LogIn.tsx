import { FC, SyntheticEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, useHistory } from 'react-router';
import { gql, useMutation } from '@apollo/client';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Layout } from '../components/Layout';
import { Body, Heading1, TextLink } from '../components/Text';
import { Form } from '../components/Form';
import { useUser } from '../util/AuthProvider';

const useLogin = () => {
  const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        accessToken
        refreshToken
      }
    }
  `;

  const [login, { loading, data, error }] = useMutation(LOGIN);
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

const FooterIdk = styled.div`
  display: flex;
  line-height: 100%;
  margin-top: auto;

  > :first-child {
    opacity: 0.6;
    margin-right: 0.5rem;
  }
`;

interface ICredentials {
  email?: string;
  password?: string;
}

interface ILogIn extends RouteComponentProps {}

export const LogIn: FC<ILogIn> = ({ history }) => {
  const { isAuthenticated } = useUser();
  const [credentials, setCredentials] = useState<ICredentials>({
    email: 'sara@synergy.com',
    password: 'asd',
  });
  const { login, loading } = useLogin();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/project-board');
    }
  }, [isAuthenticated, history]);

  return (
    <Layout.TwoThirdGrid>
      <Layout.FormWrapper>
        <Heading1>Log In</Heading1>
        <Form>
          <Input
            type='email'
            label='email'
            defaultValue={credentials.email}
            onChange={(e: SyntheticEvent) =>
              setCredentials({
                email: (e.currentTarget as HTMLInputElement).value,
              })
            }
          />
          <Input
            type='password'
            label='password'
            defaultValue={credentials.password}
            onChange={(e: SyntheticEvent) =>
              setCredentials({
                password: (e.currentTarget as HTMLInputElement).value,
              })
            }
          />
          <Button
            onClick={() =>
              login({
                variables: {
                  email: credentials?.email,
                  password: credentials?.password,
                },
              })
            }
          >
            {loading ? 'loading' : 'Log In'}
          </Button>
        </Form>
        <FooterIdk>
          <Body>Joining the club?</Body>
          <TextLink to='/create-account'>
            Create account <span>✨</span>
          </TextLink>
        </FooterIdk>
      </Layout.FormWrapper>
      <div></div>
    </Layout.TwoThirdGrid>
  );
};
