import { FC } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { Button } from '../../../components/Button';
import { Body, Heading3, SmallText } from '../../../components/Text';
import { theme } from '../../../styles/theme';
import { Project } from '../../../generated/types';
import { Tag } from '../../../components/Tag';
import { cardBaseStyles } from '../../../styles/baseStyles';
import { PROJECTS_PATH } from '../../../constants/paths';

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

export const ProjectCardFooter = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Members = styled.div`
  display: flex;
`;

export const Member = styled.div<{ $margin: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  background-color: #f3b7ae;
  border: 0.125rem solid white;
  margin-left: ${props => (props.$margin === 0 ? '0' : '-1rem')};
  z-index: ${props => props.$margin};

  > div {
    margin-right: -2px;
    letter-spacing: 1px;
    font-size: 1rem;
    opacity: 0.7;
  }
`;

export const getInitials = (firstName: string, lastName: string) =>
  `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`;

export const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  const { tags, members } = project;
  const hasTags = tags !== null && tags !== undefined;
  const hasMembers = members !== null && members !== undefined;

  const history = useHistory();

  const membersCopy = members.concat();
  const membersToRender =
    membersCopy.length > 5 ? membersCopy.splice(0, 5) : membersCopy;

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

        <Button onClick={() => history.push(`${PROJECTS_PATH}/${project._id}`)}>
          View
        </Button>
      </ProjectCardFooter>
    </StyledProjectCard>
  );
};
