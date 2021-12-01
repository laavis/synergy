import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { MutationJoinProjectArgs } from '../generated/types';

export const useJoinProject = () => {
  const JOIN_PROJECT = gql`
    mutation JoinProject($projectId: ID!) {
      joinProject(projectId: $projectId)
    }
  `;

  const [joinProjectMutation] =
    useMutation<MutationJoinProjectArgs>(JOIN_PROJECT);

  const joinProject = useCallback(
    async (projectId: string) => {
      try {
        await joinProjectMutation({
          variables: {
            projectId,
          },
        });
      } catch (error) {}
    },
    [joinProjectMutation]
  );

  return { joinProject };
};
