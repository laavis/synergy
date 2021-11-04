import { FC, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';

import { Button } from '../components/Button';
import { Input } from '../components/Input';

import { Layout } from '../components/Layout';
import { Body, Heading1, SmallText, TextLink } from '../components/Text';
import { Form } from '../components/Form';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #e31837;
  background-color: #e3183626;
  border-radius: 4px;
  color: #e31837;

  > ${Body} {
    color: inherit;
  }
`;

const FooterIdk = styled.div`
  display: flex;
  line-height: 100%;
  margin-top: auto;

  > :first-child {
    opacity: 0.6;
    margin-right: 0.5rem;
  }
`;

const useCreateAccount = () => {
  const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation(
      $email: String!
      $password: String!
      $rePassword: String!
      $firstName: String!
      $lastName: String!
    ) {
      createUser(
        email: $email
        password: $password
        rePassword: $rePassword
        firstName: $firstName
        lastName: $lastName
      ) {
        firstName
        lastName
      }
    }
  `;

  const [createAccount, { loading, data, error }] = useMutation(
    CREATE_USER_MUTATION,
    { errorPolicy: 'all' }
  );

  return { createAccount, loading, error };
};

interface INewUser {
  email?: string;
  password?: string;
  rePassword?: string;
  firstName?: string;
  lastName?: string;
}

type TNewUserField = keyof INewUser;

export const CreateAccount: FC = () => {
  const [newUser, setNewUser] = useState<INewUser>({
    email: 'test@synergy.com',
    password: 'test',
    rePassword: 'test',
    firstName: 'Test',
    lastName: 'Synergy',
  });
  const { createAccount, loading, error } = useCreateAccount();

  const handleCreateAccount = () => {
    if (!newUser) return;

    // todo frontend validation?

    const { email, password, rePassword, firstName, lastName } = newUser;

    createAccount({
      variables: {
        email,
        password,
        rePassword,
        firstName,
        lastName,
      },
    });
  };

  const handleChange = (e: SyntheticEvent, key: TNewUserField) => {
    const value = (e.target as HTMLInputElement).value;
    setNewUser(state => ({
      ...state,
      [key]: value,
    }));
  };

  return (
    <Layout.TwoThirdGrid>
      <Layout.FormWrapper>
        <Heading1>Create account</Heading1>
        <Form>
          <Input
            type='email'
            label='email'
            defaultValue={newUser?.email}
            onChange={(e: SyntheticEvent) => handleChange(e, 'email')}
          />
          <Input
            type='password'
            label='password'
            defaultValue={newUser?.password}
            onChange={(e: SyntheticEvent) => handleChange(e, 'password')}
          />
          <Input
            type='password'
            label='re-password'
            defaultValue={newUser?.rePassword}
            onChange={(e: SyntheticEvent) => handleChange(e, 'rePassword')}
          />
          <Input
            type='text'
            label='first name'
            defaultValue={newUser?.firstName}
            onChange={(e: SyntheticEvent) => handleChange(e, 'firstName')}
          />

          <Input
            type='text'
            label='last name'
            defaultValue={newUser?.lastName}
            onChange={(e: SyntheticEvent) => handleChange(e, 'lastName')}
          />
          <Button onClick={() => handleCreateAccount()}>
            {loading ? 'loading' : 'Create account'}
          </Button>
        </Form>
        {error &&
          error.graphQLErrors.map((error, index) => (
            <ErrorMessage key={index}>
              <SmallText>{error.message}</SmallText>
            </ErrorMessage>
          ))}
        <FooterIdk>
          <Body>Already a member?</Body>
          <TextLink to='/login'>
            Log In <span>🎉</span>
          </TextLink>
        </FooterIdk>
      </Layout.FormWrapper>
      <div />
    </Layout.TwoThirdGrid>
  );
};
