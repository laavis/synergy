import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Body } from '../../Text';

import { theme } from '../../../styles/theme';

const StyledNavItem = styled.div<{ $active: boolean }>`
  padding: 0.75rem 0 0.75rem 1.5rem;
  border-top-right-radius: 43px;
  border-bottom-right-radius: 43px;
  background-color: ${props =>
    props.$active ? theme.violet.ghost : 'transparent'};
`;

const StyledLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  color: #252528;

  color: ${props =>
    props.$active
      ? theme.foreground.primary.og
      : theme.foreground.primary.pale};
`;

export interface INavItemProps {
  to: string;
}

export const NavItem: FC<INavItemProps> = ({ to, children }) => {
  const location = useLocation();

  const active = `/${location.pathname.substring(1)}` === to;

  return (
    <StyledNavItem $active={active}>
      <StyledLink to={to} $active={active}>
        <Body>{children}</Body>
      </StyledLink>
    </StyledNavItem>
  );
};
