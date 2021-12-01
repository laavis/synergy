import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';

import { Button } from '../../../components/Button';
import { Body, Heading3, SmallText } from '../../../components/Text';
import { theme } from '../../../styles/theme';
import {
  MutationJoinProjectArgs,
  Project,
  ProjectMember,
} from '../../../generated/types';
import { Tag } from '../../../components/Tag';
import { cardBaseStyles } from '../../../styles/baseStyles';
import { useUser } from '../../../util/AuthProvider';

const StyledProjectCard = styled.article`
  ${cardBaseStyles}

  > :first-child {
    > :first-child {
      margin-bottom: 1rem;
    }
  }

  > :not(:last-child) {
    margin-bottom: 0.5rem;
  }

  > :last-child {
    margin-top: auto;
  }
`;

const Title = styled(Heading3)``;

const Tags = styled.div`
  display: flex;

  > :not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Description = styled(Body)`
  color: ${theme.foreground.primary.pale};
  padding-bottom: 1rem;
`;

const ProjectCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Members = styled.div`
  display: flex;
`;

const Member = styled.div<{ $margin: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  background-color: #f3b7ae;
  border: 0.125rem solid white;
  margin-left: -${props => props.$margin}rem;
  z-index: ${props => props.$margin};

  > div {
    margin-right: -2px;
    letter-spacing: 1px;
    font-size: 1rem;
    opacity: 0.7;
  }
`;

const useJoinProject = () => {
  const JOIN_PROJECT = gql`
    mutation JoinProject($projectId: ID!) {
      joinProject(projectId: $projectId)
    }
  `;

  const [joinProjectMutation] =
    useMutation<MutationJoinProjectArgs>(JOIN_PROJECT);

  const joinProject = useCallback(
    async (projectId: string) => {
      try {
        await joinProjectMutation({
          variables: {
            projectId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    [joinProjectMutation]
  );

  return { joinProject };
};

const getInitials = (firstName: string, lastName: string) =>
  `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`;

const hasAlreadyJoinedProject = (
  userId: string,
  projectMembers: ProjectMember[]
): boolean => {
  console.log({ userId });
  console.log(projectMembers);
  return projectMembers.find(member => member.userId === userId) ? true : false;
};

export const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  const { tags, members } = project;
  const hasTags = tags !== null && tags !== undefined;
  const hasMembers = members !== null && members !== undefined;

  const { user } = useUser();
  const userId = user?._id;

  const alreadyJoinedProject = userId
    ? hasAlreadyJoinedProject(userId, members ?? [])
    : false;

  const membersCopy = members.concat();
  const membersToRender =
    membersCopy.length > 5 ? membersCopy.splice(0, 5) : membersCopy;

  const { joinProject } = useJoinProject();

  return (
    <StyledProjectCard>
      <div>
        <Title>{project.title}</Title>
        {hasTags && (
          <Tags>
            {tags.map(tech => (
              <Tag>
                <SmallText>{tech}</SmallText>
              </Tag>
            ))}
          </Tags>
        )}
      </div>
      <Description>{project.description}</Description>
      <ProjectCardFooter>
        {hasMembers && (
          <Members>
            {membersToRender?.map((member, index) => (
              <Member $margin={index} key={member.userId}>
                <SmallText>
                  {getInitials(member.firstName, member.lastName)}
                </SmallText>
              </Member>
            ))}
          </Members>
        )}
        <Button
          $disabled={alreadyJoinedProject}
          onClick={() => joinProject(project._id)}
        >
          Join
        </Button>
      </ProjectCardFooter>
    </StyledProjectCard>
  );
};
