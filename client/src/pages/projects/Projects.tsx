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
  margin-left: 14rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  word-break: break-all;

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
        kickoffDate
        description
        tags
        members
        developerRoles {
          type
          language
          technologies
        }
      }
    }
  `;

  const { data, loading } = useQuery(GET_PROJECTS);

  const projects = data?.projects;

  return { projects, loading };
};

export const Projects: FC = () => {
  const { projects, loading } = useProjects();

  return (
    <StyledProjects>
      <LinkButton to={CREATE_PROJECT_PATH} $color='#8674fb'>
        + Create project
      </LinkButton>
      {!loading ? (
        <ProjectsGrid>
          {projects.map((project: Project) => (
            <ProjectCard project={project} />
          ))}
        </ProjectsGrid>
      ) : (
        <Heading3>loading</Heading3>
      )}
    </StyledProjects>
  );
};
