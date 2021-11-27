import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { Body, Heading3, SmallText } from '../../../components/Text';
import { theme } from '../../../styles/theme';
import { Project as IProject } from '../../../generated/types';
import { getRandomTagColor, Tag } from '../../../components/Tag';

const StyledProjectCard = styled.article`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

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
    align-self: flex-end;
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

export interface IProjectCardProps {
  project: IProject;
}

export const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  const { tags } = project;
  const hasTags = tags !== null && tags !== undefined;

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
      <Button>Join</Button>
    </StyledProjectCard>
  );
};
