import styled from 'styled-components';
import { baseBodyStyles, Body } from './Text';

export const Button = styled.button`
  border: none;
  min-width: 8rem;
  padding: 0 1rem;
  height: 2.25rem;
  border-radius: 8px;
  background-color: #252528;
  cursor: pointer;
  ${baseBodyStyles};
  color: white;

  > ${Body} {
    margin-top: -1px;
  }
`;

export interface IButtonProps {}
