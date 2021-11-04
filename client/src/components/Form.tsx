import React, { Children, FC } from 'react';
import styled from 'styled-components';

import { useSprings, animated, config } from 'react-spring';

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  max-width: 16rem;

  > :not(:last-child) {
    margin-bottom: 0.5rem;
  }

  > :last-child {
    /* margin-left: auto; */
  }
`;

export interface IFormProps {}

export const Form: FC<IFormProps> = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const [springs] = useSprings(childrenArray.length, index => ({
    from: {
      opacity: 0,
      transform: 'translateX(-0.5rem)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(0rem)',
    },
    delay: index * 100,
    config: config.stiff,
  }));

  return (
    <StyledForm>
      {childrenArray.map((child, index) => (
        <animated.div key={index} style={springs[index]}>
          {child}
        </animated.div>
      ))}
    </StyledForm>
  );
};
