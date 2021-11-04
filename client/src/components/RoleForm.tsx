import React, { FC } from 'react';
import styled from 'styled-components';
import { SmallText } from './Text';

const StyledRoleForm = styled.div`
  > :first-child {
    opacity: 0.6;
  }
`;

export interface IRoleFormProps {}

export const RoleForm: FC<IRoleFormProps> = ({}) => {
  return (
    <StyledRoleForm>
      <SmallText>Roles</SmallText>
    </StyledRoleForm>
  );
};
