import { gql, useMutation, useQuery } from '@apollo/client';
import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { Layout } from '../components/Layout';
import { RoleForm } from '../components/RoleForm';
import { Body, Heading2, Heading3, SmallText } from '../components/Text';
import {
  MutationCreateProjectArgs,
  MutationUpdateUserArgs,
  User,
  ESkillType,
} from '../generated/types';
import { ICreateProjectInput } from '../types';
import { useUser } from '../util/AuthProvider';

const StyledProfile = styled.section`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding-top: 4rem;
  margin-left: 14rem;
  box-sizing: border-box;

  > :first-child {
    margin-bottom: 1rem;
  }

  > :last-child {
    padding: 2rem 0;
  }
`;

export interface IProfileProps {}

const useProfile = (userId: string) => {
  const GET_USER = gql`
    query GetUser($userId: ID!) {
      user(userId: $userId) {
        firstName
        lastName
        bio
      }
    }
  `;

  const { data, loading } = useQuery(GET_USER, { variables: { userId } });
  const user: User = data?.user;

  return { user, loading };
};

const useUpdateUser = () => {
  const UPDATE_USER = gql`
    mutation UpdateUser($input: MutationUpdateUserArgs) {
      updateUser(input: $input) {
        skills {
          type
          name
          level
          description
        }
      }
    }
  `;

  const [updateUser, { data, loading }] =
    useMutation<MutationUpdateUserArgs>(UPDATE_USER);

  return { updateUser };
};

export const Profile: FC<IProfileProps> = ({}) => {
  const { user } = useProfile('617826384d7c8a75310bd037');
  const { updateUser } = useUpdateUser();

  if (!user) {
    return <Heading2>No user!</Heading2>;
  }

  const { firstName, lastName, bio } = user;

  const skillTypes = Object.keys(ESkillType);

  return (
    <StyledProfile>
      <Heading2>
        {firstName} {lastName}
      </Heading2>
      {bio && <Body>{bio}</Body>}
      <Layout.FormWrapper>
        <Heading3>Add skill</Heading3>
        <Form>
          <select name='Skill Type'>
            {skillTypes.map(skillType => (
              <option value={skillType}>{skillType}</option>
            ))}
          </select>
        </Form>
      </Layout.FormWrapper>
    </StyledProfile>
  );
};
