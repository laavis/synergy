import { gql } from 'apollo-server-core';

export const tokenTypeDefs = gql`
  type Tokens {
    accessToken: String
    refreshToken: String!
  }

  type AccessToken {
    accessToken: String
  }

  type Query {
    renewAccessToken(refreshToken: String!): AccessToken
  }
`;
