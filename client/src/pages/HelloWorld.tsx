import { FC } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Heading1 } from '../components/Text';

const StyledHelloWorld = styled.div``;

export const HelloWorld: FC = () => {
  const HELLO_WORLD_QUERY = gql`
    query HelloWorldQuery {
      helloWorld
    }
  `;

  const { loading, data } = useQuery(HELLO_WORLD_QUERY);

  return (
    <StyledHelloWorld>
      <Heading1>{loading ? 'Loading...' : data?.helloWorld}</Heading1>
    </StyledHelloWorld>
  );
};
