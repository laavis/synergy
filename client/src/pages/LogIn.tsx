import { FC, SyntheticEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';

import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Layout } from '../components/Layout';
import { Body, Heading1, TextLink } from '../components/Text';
import { Form } from '../components/Form';
import { useUser } from '../util/AuthProvider';
import { useLogin } from '../hooks/useLogin';
import { PROJECTS_PATH } from '../constants/paths';

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
      history.push(PROJECTS_PATH);
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
