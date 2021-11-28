import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const FONT_BODY = "'Roboto', 'sans-serif'";
const FONT_HEADING = "'Sora', 'sans-serif'";

export const baseBodyStyles = css`
  letter-spacing: -0.2px;
  font-family: ${FONT_BODY};
`;

export const baseHeadingStyles = css`
  margin: 0;
  font-family: ${FONT_HEADING};
`;

export const Heading1 = styled.h1`
  ${baseHeadingStyles};
  font-size: 2rem;
`;

export const Heading2 = styled.h2`
  ${baseHeadingStyles};
  font-size: 1.75rem;
`;

export const Heading3 = styled.h3<{ $faded?: boolean }>`
  ${baseHeadingStyles};
  font-size: 1.375rem;

  ${({ $faded }) =>
    $faded &&
    css`
      opacity: 0.3;
    `}
`;

export const Heading4 = styled.h4`
  ${baseHeadingStyles};
  font-size: 1rem;
`;

export const Body = styled.div<{ $dimmed?: boolean; $faded?: boolean }>`
  ${baseBodyStyles};
  font-size: 1rem;

  ${({ $dimmed }) =>
    $dimmed &&
    css`
      opacity: 0.7;
    `}

  ${({ $faded }) =>
    $faded &&
    css`
      opacity: 0.3;
    `}
`;

export const SmallText = styled.div<{ $dimmed?: boolean }>`
  ${baseBodyStyles};
  font-size: 0.813rem;
  font-size: 14px;

  ${({ $dimmed }) =>
    $dimmed &&
    css`
      opacity: 0.7;
    `}
`;

export const SmallTextStrong = styled(SmallText)`
  font-weight: medium;
`;

export const TextLink = styled(Link)`
  ${baseBodyStyles};
  color: #252528;
  text-decoration: none;
  font-weight: 500;
  transition: color 100ms ease;

  :hover {
    color: #8573fa;
  }
`;
