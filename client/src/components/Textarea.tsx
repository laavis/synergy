import React, { FC } from 'react';
import styled from 'styled-components';
import { baseBodyStyles, SmallText } from './Text';

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > :first-child {
    margin-bottom: 0.25rem;
  }
`;

const StyledTextarea = styled.textarea`
  ${baseBodyStyles}
  width: 100%;
  box-sizing: border-box;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: hsla(240, 4%, 15%, 0.05);
  font-size: 1rem;
  border: 2px solid transparent;
  transition: border-color 150ms ease;

  :focus {
    outline: none;
    border: 2px solid #8573fa;
  }
`;

const Label = styled(SmallText)`
  opacity: 0.6;
`;

export interface ITextareaProps {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: FC<ITextareaProps> = ({ label, ...props }) => {
  return (
    <TextareaWrapper>
      <Label>{label}</Label>
      <StyledTextarea {...props} />
    </TextareaWrapper>
  );
};
