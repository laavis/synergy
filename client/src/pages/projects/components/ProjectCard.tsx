import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { Body, Heading3 } from '../../../components/Text';
import { theme } from '../../../styles/theme';
import { Project as IProject } from '../../../generated/types';

const StyledProjectCard = styled.article`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  > :first-child {
    margin-bottom: 1rem;
  }

  > :last-child {
    margin-top: 2rem;
    align-self: flex-end;
  }
`;

const Title = styled(Heading3)``;

const Description = styled(Body)`
  color: ${theme.foreground.primary.pale};
`;

export interface IProjectCardProps {
  project: IProject;
}

export const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  return (
    <StyledProjectCard>
      <Title>{project.title}</Title>
      <Description>{project.description}</Description>
      <Button>Read More</Button>
    </StyledProjectCard>
  );
};