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

interface ILogIn extends RouteComponentProps {}

export const LogIn: FC<ILogIn> = ({ history }) => {
  const { isAuthenticated } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
            label='Email'
            defaultValue={email}
            onChange={(e: SyntheticEvent) =>
              setEmail((e.currentTarget as HTMLInputElement).value)
            }
          />
          <Input
            type='password'
            label='Password'
            defaultValue={password}
            onChange={(e: SyntheticEvent) =>
              setPassword((e.currentTarget as HTMLInputElement).value)
            }
          />
          <Button
            type='submit'
            onClick={() => {
              console.log(email, password);
              login({
                variables: {
                  email,
                  password,
                },
              });
            }}
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
