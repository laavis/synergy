import { gql, useMutation } from '@apollo/client';
import {
  CreateProjectInput,
  MutationCreateProjectArgs,
} from '../generated/types';

export const useCreateProject = () => {
  const CREATE_PROJECT = gql`
    mutation CreateProject($input: CreateProjectInput!) {
      createProject(input: $input) {
        title
      }
    }
  `;

  const [createProject, { loading, data, error }] = useMutation<
    CreateProjectInput,
    MutationCreateProjectArgs
  >(CREATE_PROJECT);

  return { createProject, loading, data };
};
