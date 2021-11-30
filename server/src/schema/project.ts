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
    technologies: [String!]!
    description: String
    maxAssignees: Int
  }

  input DeveloperRoleInput {
    type: ERole!
    skillLevel: Int!
    language: String!
    technologies: [String!]!
    description: String
    maxAssignees: Int
  }

  type Project {
    _id: ID!
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
    members: [ID!]
  }


  input CreateProjectInput {
    title: String!
    description: String!
    tags: [String!]
    developerRoles: [DeveloperRoleInput!]!
    kickoffDate: String
  }

  extend type Mutation {
    createProject(input: CreateProjectInput!): Project
    joinProject(projectId: ID!): Boolean!
  }

  extend type Query {
    projects: [Project]
  }
`;
