import { FC } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Heading2, Heading3 } from '../../components/Text';
import { ProjectCard } from './components/ProjectCard';
import { Project as IProject } from '../../generated/types';

const StyledProjects = styled.section`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding-top: 4rem;
  margin-left: 14rem;
  box-sizing: border-box;

  > :first-child {
    margin-bottom: 1rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`;

const useProjects = () => {
  const PROJECTS_QUERY = gql`
    query ProjectsQuery {
      projects {
        title
        kickoff
        description
        technologies
        roles {
          type
          name
          assignees
        }
      }
    }
  `;

  const { data, loading } = useQuery(PROJECTS_QUERY);

  const projects = data?.projects;

  return { projects, loading };
};

export const Projects: FC = () => {
  const { projects, loading } = useProjects();

  return (
    <StyledProjects>
      <Heading2>Projects</Heading2>
      {!loading ? (
        <ProjectsGrid>
          {projects.map((project: IProject) => (
            <ProjectCard project={project} />
          ))}
        </ProjectsGrid>
      ) : (
        <Heading3>loading</Heading3>
      )}
    </StyledProjects>
  );
};
