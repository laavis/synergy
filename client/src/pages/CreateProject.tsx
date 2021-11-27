import { gql, useMutation } from '@apollo/client';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { Layout } from '../components/Layout';
import { Heading2 } from '../components/Text';
import { MutationCreateProjectArgs } from '../generated/types';
import { useUser } from '../util/AuthProvider';
import { FormBlock } from '../components/FormBlock';

const StyledCreateProject = styled.section`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding-top: 4rem;
  margin-left: 14rem;
  box-sizing: border-box;

  > :first-child {
    margin-bottom: 1rem;
  }

  > :last-child {
    padding: 2rem 0;
  }
`;

export interface ICreateProjectProps {}

const useCreateProject = () => {
  const CREATE_PROJECT = gql`
    mutation CreateProject($input: MutationCreateProjectArgs) {
      createProject(input: $input) {
        title
      }
    }
  `;

  const [createProject, { loading, data, error }] = useMutation(CREATE_PROJECT);

  return { createProject, loading, data };
};

export const CreateProject: FC<ICreateProjectProps> = ({}) => {
  return (
    <StyledCreateProject>
      <Heading2>Create project</Heading2>
      <Layout.FormWrapper>
        <Form>
          <Input type='text' label='Project name' />
          <Input type='text' label='Project title' />
          <textarea placeholder='Description' />
          <Input type='text' label='Technologies (comma separated)' />
          <FormBlock.DeveloperRole />
          <Button>Create</Button>
        </Form>
      </Layout.FormWrapper>
    </StyledCreateProject>
  );
};
