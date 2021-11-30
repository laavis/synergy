import React, { FC } from 'react';
import styled from 'styled-components';
import { Project } from '../generated/types';

const StyledProjectDetails = styled.div`
  width: 100%;
  max-width: 60rem;
  padding-top: 4rem;
  margin-left: 14rem;
  box-sizing: border-box;
  align-self: flex-start;
`;

export interface IProjectDetailsProps {}

export const ProjectDetails: FC = () => {
  return (
    <StyledProjectDetails>
      <span>:D</span>
    </StyledProjectDetails>
  );
};
