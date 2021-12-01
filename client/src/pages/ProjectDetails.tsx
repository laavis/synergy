import React, { FC, useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Project, ProjectMember } from '../generated/types';
import { cardBaseStyles } from '../styles/baseStyles';
import {
  Body,
  Heading2,
  Heading3,
  Heading4,
  SmallText,
} from '../components/Text';
import { Tag, Tags } from '../components/Tag';
import {
  DeveloperRolePreview,
  FlexRow,
} from './CreateProject/components/Preview';
import { roleNameMap, skillLevelNameMap } from '../util';
import { TSkillLevel } from '../types';
import { Button } from '../components/Button';
import { useJoinProject } from '../hooks/useJoinProject';
import { useUser } from '../util/AuthProvider';
import {
  Member,
  Members,
  ProjectCardFooter,
  getInitials,
} from './projects/components/ProjectCard';

const StyledProjectDetails = styled.div`
  width: 100%;
  max-width: 60rem;
  padding-top: 4rem;
  box-sizing: border-box;
  align-self: flex-start;
  margin: 0 auto;
`;

const StyledCard = styled.div`
  ${cardBaseStyles}

  > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const StyledDeveloperRolePreview = styled(DeveloperRolePreview)`
  padding: 0;
  :hover {
    background-color: transparent;
  }
`;

const useProject = (projectId: string) => {
  const GET_PROJECT = gql`
    query GetProject($projectId: ID!) {
      project(projectId: $projectId) {
        _id
        title
        description
        tags
        members {
          userId
          firstName
          lastName
        }
        developerRoles {
          type
          language
          technologies
        }
      }
    }
  `;

  const { data, loading, refetch } = useQuery(GET_PROJECT, {
    variables: {
      projectId,
    },
  });

  const project = data?.project as Project;

  return { project, loading, refetch };
};

const hasAlreadyJoinedProject = (
  userId: string,
  projectMembers: ProjectMember[]
): boolean =>
  projectMembers.find(member => member.userId === userId) ? true : false;

export const ProjectDetails: FC<RouteComponentProps<{ projectId: string }>> = ({
  match: {
    params: { projectId },
  },
}) => {
  const { project, loading, refetch } = useProject(projectId);
  const { joinProject } = useJoinProject();
  const { user } = useUser();

  const userId = user?._id;
  const alreadyJoinedProject = userId
    ? hasAlreadyJoinedProject(userId, project?.members ?? [])
    : false;

  const membersCopy = project?.members.concat() ?? [];
  const membersToRender =
    membersCopy.length > 5 ? membersCopy.splice(0, 5) : membersCopy;

  const handleJoinProject = useCallback(async () => {
    try {
      await joinProject(project._id);

      refetch();
    } catch (error) {}
  }, [joinProject, project, refetch]);

  return (
    <StyledProjectDetails>
      {loading ? (
        <Heading2>Loading... :)</Heading2>
      ) : (
        <>
          <StyledCard>
            <Heading2>{project.title}</Heading2>
            <Tags>
              {project.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Tags>

            <Body $dimmed>{project.description}</Body>
            <Heading3>Roles</Heading3>
            {project.developerRoles.map(devRole => (
              <StyledDeveloperRolePreview>
                <FlexRow>
                  <Heading4>{devRole.language}</Heading4>
                  <Body>{roleNameMap[devRole.type]}</Body>
                </FlexRow>
                <FlexRow>
                  <Body $dimmed>Technologies: </Body>
                  <Tags>
                    {devRole.technologies?.map(tech => (
                      <Tag $color='#C7D9FC'>{tech}</Tag>
                    ))}
                  </Tags>
                </FlexRow>
                <FlexRow>
                  <Body $dimmed>Skill level:</Body>
                  <Body>
                    {skillLevelNameMap[devRole.skillLevel as TSkillLevel]}
                  </Body>
                </FlexRow>
                <FlexRow>
                  <Body $dimmed>Description: </Body>
                  <Body>{devRole.description}</Body>
                </FlexRow>
              </StyledDeveloperRolePreview>
            ))}
            <ProjectCardFooter>
              <Members>
                {membersToRender?.map((member, index) => (
                  <Member $margin={index} key={member.userId}>
                    <SmallText>
                      {getInitials(member.firstName, member.lastName)}
                    </SmallText>
                  </Member>
                ))}
              </Members>
              <Button
                $disabled={alreadyJoinedProject}
                onClick={() => handleJoinProject()}
              >
                Join
              </Button>
            </ProjectCardFooter>
          </StyledCard>
        </>
      )}
    </StyledProjectDetails>
  );
};
