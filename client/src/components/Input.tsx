import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { SmallText } from './Text';
import { baseBodyStyles } from './Text';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 4.75rem;

  > :first-child {
    margin-bottom: 0.25rem;
    opacity: 0.6;
  }
`;

const StyledInput = styled.input`
  ${baseBodyStyles}
  width: 100%;
  height: 2.25rem;
  box-sizing: border-box;
  border: none;
  padding: 0 0.5rem;
  /* padding: 0.45rem 0.5rem; */
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

const ErrorText = styled(SmallText)`
  color: red;
  font-size: 12px;
  margin-top: 0.25rem;
`;

type TInput = 'email' | 'password' | 'text';

export interface IInputProps {
  label: string;
  error?: string;
  type?: TInput;
  defaultValue?: string;
  onChange?: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, ...props }, forwardedRef) => {
    return (
      <InputWrapper>
        <SmallText>{label}</SmallText>
        <StyledInput ref={forwardedRef} as='input' {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
