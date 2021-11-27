import { gql, useMutation } from '@apollo/client';

export const useCreateAccount = () => {
  const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation(
      $email: String!
      $password: String!
      $rePassword: String!
      $firstName: String!
      $lastName: String!
    ) {
      createUser(
        email: $email
        password: $password
        rePassword: $rePassword
        firstName: $firstName
        lastName: $lastName
      ) {
        firstName
        lastName
      }
    }
  `;

  const [createAccount, { loading, error }] = useMutation(
    CREATE_USER_MUTATION,
    { errorPolicy: 'all' }
  );

  return { createAccount, loading, error };
};
