import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  type Location {
    country: String
    city: String
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    # Description given by user
    bio: String
    location: Location
    # Skills of the user
    skills: [Skill!]
    # Projects that user has been or is participating in
  }

  type Me {
    email: String
  }

  extend type Query {
    users: [User]
    me: Me
  }

  # Inputs
  input LocationInput {
    country: String
    city: String
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    bio: String
    location: LocationInput
    skills: [SkillInput]
  }

  extend type Mutation {
    createUser(
      email: String!
      password: String!
      rePassword: String!
      firstName: String!
      lastName: String!
    ): User
    updateUser(input: UpdateUserInput): User
    login(email: String!, password: String!): Tokens
  }
`;
