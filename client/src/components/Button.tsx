import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { baseBodyStyles, Body } from './Text';

type TButtonProps = {
  $color?: string;
};

const buttonStyles = css`
  ${baseBodyStyles};
  border: none;
  min-width: 8rem;
  padding: 0 1rem;
  height: 2.25rem;
  border-radius: 8px;
  background-color: #252528;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;

  > ${Body} {
    margin-top: -1px;
  }
`;

export const Button = styled.button<TButtonProps>`
  ${buttonStyles}

  ${({ $color }) =>
    $color &&
    css`
      background-color: ${$color};
    `}
`;

export const LinkButton = styled(Link)<TButtonProps>`
  ${buttonStyles}
  text-decoration: none;
  ${({ $color }) =>
    $color &&
    css`
      background-color: ${$color};
    `}
`;
