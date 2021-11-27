import { gql } from 'apollo-server-core';
import { ERole } from '../types';

export const projectTypeDefs = gql`
  enum ERole {
    ${Object.values(ERole).join('\n')}
  }

  type DeveloperRole {
    type: ERole!
    skillLevel: Int!
    language: String!
    technologies: [String!]
    description: String
    assignees: [ID!]
    maxAssignees: Int
  }

  input DeveloperRoleInput {
    type: ERole!
    skillLevel: Int!
    language: String!
    technologies: [String!]
    description: String
    assignees: [ID!]
    maxAssignees: Int
  }

  type OtherRole {
    type: ERole!
    name: String!
    skillLevel: Int!
    technologies: [String!]
    description: String
    assignees: [ID!]
    maxAssignees: Int
  }

  input OtherRoleInput {
    type: ERole!
    name: String!
    skillLevel: Int!
    technologies: [String!]
    description: String
    assignees: [ID!]
    maxAssignees: Int
  }

  type Project {
    title: String!
    # User's id who has created the project
    createdBy: ID!
    # Date when project has been set to start
    kickoffDate: String
    # Detailed description of the project
    description: String!
    # Stack used for the project, e.g. Node.js, React, TypeScript
    tags: [String!]
    developerRoles: [DeveloperRole!]!
    otherRoles: [OtherRole!]
  }


  input CreateProjectInput {
    title: String!
    description: String!
    tags: [String!]
    developerRoles: [DeveloperRoleInput!]!
    otherRoles: [OtherRoleInput!]
    kickoffDate: String
  }

  extend type Mutation {
    createProject(input: CreateProjectInput!): Project
  }

  extend type Query {
    projects: [Project]
  }
`;
