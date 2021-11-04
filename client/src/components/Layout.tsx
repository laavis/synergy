import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 8rem;
  padding-bottom: 4rem;

  > :first-child {
    margin-bottom: 5rem;
  }
`;

const TwoThirdGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  min-height: 100vh;

  > :last-child {
    background-color: #252528;
  }
`;

export const Layout = {
  TwoThirdGrid,
  FormWrapper,
};
