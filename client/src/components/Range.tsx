import React, { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components';

const StyledRange = styled.div`
  display: flex;
  position: relative;
  height: 2.75rem;
  align-items: flex-start;

  > input {
    flex-grow: 1;
  }

  :before,
  :after {
    position: absolute;
    bottom: 0rem;
    font-size: 12px;
    opacity: 0.6;
    color: #252528;
  }

  :before {
    content: '1 - Beginner';
  }

  :after {
    right: 0;
    content: '5 - Expert';
  }
`;

export interface IRangeProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  range: {
    min: number;
    max: number;
  };
}

export const Range: FC<IRangeProps> = ({ value, setValue, range }) => {
  return (
    <StyledRange>
      <input
        value={value}
        type='range'
        min={range.min}
        max={range.max}
        onChange={e => setValue(parseInt(e.target.value))}
      />
    </StyledRange>
  );
};
