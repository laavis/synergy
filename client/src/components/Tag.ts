import styled from 'styled-components';
import { tagColors } from '../styles/tagColors';

export const getRandomTagColor = () => {
  const randomIndex = Math.floor(Math.random() * tagColors.length);

  return tagColors[randomIndex];
};

export const Tag = styled.span<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.25rem;
  background-color: ${props => props.$color || '#c7d9fc'};
  padding: 0 0.25rem;
  border-radius: 0.125rem;
`;
