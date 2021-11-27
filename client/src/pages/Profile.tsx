import { gql, useMutation, useQuery } from '@apollo/client';
import { FC } from 'react';
import styled from 'styled-components';
import { AddSkill } from '../components/AddSkill';
import { Form } from '../components/Form';
import { Layout } from '../components/Layout';
import {
  Body,
  Heading2,
  Heading3,
  Heading4,
  SmallTextStrong,
} from '../components/Text';
import { MutationUpdateUserArgs, User, ESkillType } from '../generated/types';

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

const SkillFormWrapper = styled(Layout.FormWrapper)`
  > :first-child {
    margin-bottom: 1rem;
  }
`;

const useProfile = (userId: string) => {
  const GET_USER = gql`
    query GetUser($userId: ID!) {
      user(userId: $userId) {
        firstName
        lastName
        bio
        skills {
          name
          level
          description
        }
      }
    }
  `;

  const { data, loading } = useQuery(GET_USER, { variables: { userId } });
  const user = data?.user as User;

  return { user, loading };
};

export interface IProfileProps {}

export const Profile: FC<IProfileProps> = ({}) => {
  const { user, loading } = useProfile('617826384d7c8a75310bd037');

  return (
    <StyledProfile>
      {loading ? (
        <Heading2>loading...</Heading2>
      ) : (
        <>
          <Heading2>
            {user.firstName} {user.lastName}
          </Heading2>

          {user.bio && <Body>{user.bio}</Body>}
          <Heading4>Skills</Heading4>
          {user.skills &&
            user.skills.map(skill => (
              <>
                <SmallTextStrong>
                  {skill.name} - level {skill.level}
                </SmallTextStrong>
              </>
            ))}
          <SkillFormWrapper>
            <Heading4>Add skill</Heading4>
            <Form>
              <AddSkill />
            </Form>
          </SkillFormWrapper>
        </>
      )}
    </StyledProfile>
  );
};
