import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useCreateProject } from '../hooks/useCreateProject';
import { useCreateProjectState } from '../state';
import { cardBaseStyles } from '../styles/baseStyles';
import { TSkillLevel } from '../types';
import { roleNameMap, skillLevelNameMap } from '../util';
import { Button } from './Button';
import { getRandomTagColor, Tag, Tags } from './Tag';
import { Body, Heading3, Heading4, SmallText } from './Text';

const StyledProjectPreview = styled.div`
  ${cardBaseStyles}

  > :not(:last-child) {
    margin-bottom: 1rem;
  }

  > :last-child {
    margin-top: auto;
    align-self: flex-end;
  }
`;

const DeveloperRolePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > :not(:last-child) {
    margin-bottom: 0.25rem;
  }

  > :first-child {
    margin-bottom: 0.5rem;
  }
`;

const FlexRow = styled.div`
  display: flex;
  align-items: baseline;

  > :first-child {
    margin-right: 0.3rem;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const isArrayValue = (array: any[]) =>
  array !== undefined && array !== null && array.length > 0;

export interface IProjectPreviewProps {}

export const ProjectPreview: FC<IProjectPreviewProps> = ({ children }) => {
  const createProjectState = useCreateProjectState(state => state);
  const { createProject } = useCreateProject();

  const { developerRoles, description, name, tags } = createProjectState;
  const hasDeveloperRoles = isArrayValue(developerRoles);

  return (
    <StyledProjectPreview>
      {children}
      {name ? (
        <Heading3>{name}</Heading3>
      ) : (
        <Heading3 $faded>Project name</Heading3>
      )}
      {description ? (
        <Body $dimmed>{description}</Body>
      ) : (
        <Body $faded>Description</Body>
      )}

      {hasDeveloperRoles &&
        developerRoles.map(devRole => (
          <DeveloperRolePreview>
            <FlexRow>
              <Heading4>{devRole.language}</Heading4>
              <Body>{roleNameMap[devRole.type]}</Body>
            </FlexRow>
            <FlexRow>
              <Body $dimmed>Technologies: </Body>
              <Tags>
                {devRole.technologies?.map(tech => (
                  <Tag $color={getRandomTagColor()}>{tech}</Tag>
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
          </DeveloperRolePreview>
        ))}
      <Button
        onClick={() =>
          createProject({
            variables: {
              input: {
                title: name ?? 'placeholder name',
                tags,
                description: description ?? 'placholder description',
                developerRoles,
              },
            },
          })
        }
        // $disabled
        $color='#8674fb'
      >
        Create
      </Button>
    </StyledProjectPreview>
  );
};
