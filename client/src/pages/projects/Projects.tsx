import { FC } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Heading3 } from '../../components/Text';
import { ProjectCard } from './components/ProjectCard';
import { Project } from '../../generated/types';
import { LinkButton } from '../../components/Button';
import { CREATE_PROJECT_PATH } from '../../constants/paths';

const StyledProjects = styled.section`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding-top: 4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  word-break: break-word;

  > :first-child {
    margin-bottom: 1rem;
    margin-left: auto;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`;

const useProjects = () => {
  const GET_PROJECTS = gql`
    query ProjectsQuery {
      projects {
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

  const { data, loading } = useQuery(GET_PROJECTS);

  const projects = data?.projects as Project[];

  return { projects, loading };
};

export const Projects: FC = () => {
  const { projects, loading } = useProjects();
  const hasProjects = projects && projects.length > 0;

  return (
    <StyledProjects>
      <LinkButton to={CREATE_PROJECT_PATH} $color='#8674fb'>
        + Create project
      </LinkButton>
      {loading ? (
        <Heading3>loading</Heading3>
      ) : (
        <>
          {hasProjects && (
            <ProjectsGrid>
              {projects.map((project: Project) => (
                <ProjectCard project={project} />
              ))}
            </ProjectsGrid>
          )}
        </>
      )}
    </StyledProjects>
  );
};
