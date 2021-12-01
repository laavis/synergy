import React, { FC } from 'react';
import styled from 'styled-components';

import { Tag, Tags } from '../../../components/Tag';
import { Body, Heading3, Heading4, SmallText } from '../../../components/Text';
import { useCreateProjectState } from '../../../state';
import { cardBaseStyles } from '../../../styles/baseStyles';
import { TSkillLevel } from '../../../types';
import { roleNameMap, skillLevelNameMap } from '../../../util';

const StyledPreview = styled.div`
  ${cardBaseStyles}

  > :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const DeveloperRolePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  border-radius: 0.375rem;
  padding: 0.5rem;
  transition: background-color 160ms ease-in-out;

  :hover {
    background-color: #f3f3f5;
  }

  > :not(:last-child) {
    margin-bottom: 0.25rem;
  }

  > :first-child {
    margin-bottom: 0.5rem;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  align-items: baseline;

  > :first-child {
    margin-right: 0.3rem;
  }
`;

const DeleteRoleButton = styled(SmallText)`
  margin-left: auto;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  color: #e31837;
  cursor: pointer;
`;

const isArrayValue = (array: any[]) =>
  array !== undefined && array !== null && array.length > 0;

export interface IPreviewProps {}

export const Preview: FC<IPreviewProps> = ({ children }) => {
  const createProjectState = useCreateProjectState(state => state);

  const { developerRoles, description, name, tags, removeDeveloperRole } =
    createProjectState;
  const hasDeveloperRoles = isArrayValue(developerRoles);

  return (
    <StyledPreview>
      {name ? (
        <Heading3>{name}</Heading3>
      ) : (
        <Heading3 $faded>Project name</Heading3>
      )}
      {tags ? (
        <Tags>
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      ) : (
        <Body $faded>Tags</Body>
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
            <DeleteRoleButton onClick={() => removeDeveloperRole(devRole)}>
              Remove
            </DeleteRoleButton>
          </DeveloperRolePreview>
        ))}
    </StyledPreview>
  );
};
