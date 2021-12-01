import React, { FC } from 'react';
import styled from 'styled-components';
import { useLogout } from '../../hooks/useLogout';
import { SmallText } from '../Text';
import { NavItem } from './components/NavItem';
import { navItems } from './navItems';

const StyledNavigation = styled.div`
  display: flex;
  background-color: #8674fb;
  padding: 0.5rem 0;
  position: relative;

  > :last-child {
    position: absolute;
    right: 0.5rem;
    color: #f3f3f5;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  max-width: 60rem;
  margin: 0 auto;
`;

const Links = styled.div`
  display: flex;

  > :not(:last-child) {
    margin-right: 1.5rem;
  }
`;

export const Navigation: FC = () => {
  const { logout } = useLogout();
  return (
    <StyledNavigation>
      <Content>
        <Links>
          {navItems.map(item => (
            <NavItem to={item.to} key={item.to}>
              {item.name}
            </NavItem>
          ))}
        </Links>
        <div></div>
      </Content>
      <SmallText onClick={() => logout()}>Logout</SmallText>
    </StyledNavigation>
  );
};
