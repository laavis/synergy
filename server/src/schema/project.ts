import { gql } from 'apollo-server-core';
import { ERole } from '../types';

export const projectTypeDefs = gql`
  enum ERole {
    ${Object.values(ERole).join('\n')}
  }

  type Role {
    type: ERole!
    # Role name if type is 'other' -- no, ts, js etc
    name: String
    skillLevel: Int!
    description: String
    # Ids of the users who has accepted the role
    assignees: [ID!]
  }

  type Project {
    title: String!
    # User's id who has created the project
    createdBy: ID!
    # Date when project has been set to start
    kickoff: String
    # Detailed description of the project
    description: String!
    # Stack used for the project, e.g. Node.js, React, TypeScript
    technologies: [String!]
    # Project roles
    roles: [Role!]!
  }

  input RoleInput {
    type: ERole!
    name: String
    skillLevel: Int!
    description: String
    assignees: [ID!]
  }

  input CreateProjectInput {
    title: String!
    kickoff: String
    description: String!
    technologies: [String!]
    roles: [RoleInput!]!
  }

  extend type Mutation {
    createProject(input: CreateProjectInput!): Project
  }

  extend type Query {
    projects: [Project]
  }
`;
