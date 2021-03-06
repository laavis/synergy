import { gql, useMutation } from '@apollo/client';
import { MutationUpdateUserArgs, UpdateUserInput } from '../generated/types';

export const useUpdateUser = () => {
  const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUserInput) {
      updateUser(input: $input) {
        _id
        skills {
          type
          name
          level
          description
        }
      }
    }
  `;

  const [updateUser] = useMutation<UpdateUserInput, MutationUpdateUserArgs>(
    UPDATE_USER
  );

  return { updateUser };
};
