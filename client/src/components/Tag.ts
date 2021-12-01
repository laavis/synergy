import styled from 'styled-components';

export const Tag = styled.span<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.25rem;
  background-color: ${props => props.$color || '#c7d9fc'};
  padding: 0 0.25rem;
  border-radius: 0.125rem;
  font-size: 0.875rem;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -0.5rem;

  > span {
    margin-top: 0.5rem;
  }

  > :not(:last-child) {
    margin-right: 0.5rem;
  }
`;
