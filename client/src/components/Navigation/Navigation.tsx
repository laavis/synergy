import React, { FC } from 'react';
import styled from 'styled-components';
import { NavItem } from './components/NavItem';
import { navItems } from './navItems';

const StyledNavigation = styled.div`
  width: 14rem;
  padding-top: 4rem;
`;

export interface INavigationProps {}

export const Navigation: FC<INavigationProps> = ({}) => {
  return (
    <StyledNavigation>
      {navItems.map(item => (
        <NavItem to={item.to} key={item.to}>
          {item.name}
        </NavItem>
      ))}
    </StyledNavigation>
  );
};