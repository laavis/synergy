import React, { FC } from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.div``;

export interface ITextareaProps {}

export const Textarea: FC<ITextareaProps> = ({}) => {
  return (
    <StyledTextarea>
      <span>:D</span>
    </StyledTextarea>
  );
};
