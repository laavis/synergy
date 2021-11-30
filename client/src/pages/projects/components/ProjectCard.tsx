import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';

import { Button } from '../../../components/Button';
import { Body, Heading3, SmallText } from '../../../components/Text';
import { theme } from '../../../styles/theme';
import { MutationJoinProjectArgs, Project } from '../../../generated/types';
import { getRandomTagColor, Tag } from '../../../components/Tag';
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

const Participants = styled.div``;

const Idk = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  background-color: #c4c4c4;
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

const hasAlreadyJoinedProject = (userId: string, projectMembers: string[]) => {
  return projectMembers.includes(userId);
};

export const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  const { tags, members } = project;
  const hasTags = tags !== null && tags !== undefined;
  const hasMembers = members !== null && members !== undefined;

  const { user } = useUser();
  const userId = user?._id;

  const idk = userId ? hasAlreadyJoinedProject(userId, members ?? []) : false;

  console.log({ idk });

  const { joinProject } = useJoinProject();

  return (
    <StyledProjectCard>
      <div>
        <Title>{project.title}</Title>
        {hasTags && (
          <Tags>
            {tags.map(tech => (
              <Tag $color={getRandomTagColor()}>
                <SmallText>{tech}</SmallText>
              </Tag>
            ))}
          </Tags>
        )}
      </div>
      <Description>{project.description}</Description>
      <ProjectCardFooter>
        {hasMembers && (
          <Participants>
            {members?.map(index => (
              <Idk key={index}></Idk>
            ))}
          </Participants>
        )}
        <Button $disabled={idk} onClick={() => joinProject(project._id)}>
          Join
        </Button>
      </ProjectCardFooter>
    </StyledProjectCard>
  );
};
