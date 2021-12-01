import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Body } from '../../Text';

const StyledNavItem = styled.div``;

const StyledLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  color: ${props => (props.$active ? '#F3F3F5' : '#F3F3F587')};
`;

export interface INavItemProps {
  to: string;
}

export const NavItem: FC<INavItemProps> = ({ to, children }) => {
  const location = useLocation();

  const active = `/${location.pathname.substring(1)}` === to;

  return (
    <StyledNavItem>
      <StyledLink to={to} $active={active}>
        <Body>{children}</Body>
      </StyledLink>
    </StyledNavItem>
  );
};
