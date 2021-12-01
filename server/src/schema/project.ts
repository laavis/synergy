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
    description: String!
    maxAssignees: Int
  }


  type ProjectMember {
    userId: ID!
    firstName: String!
    lastName: String!
  }


  type Project {
    _id: ID!
    title: String!
    createdBy: ID!
    description: String!
    tags: [String!]!
    developerRoles: [DeveloperRole!]!
    members: [ProjectMember!]!
  }


  input CreateProjectInput {
    title: String!
    description: String!
    tags: [String!]!
    developerRoles: [DeveloperRoleInput!]!
  }

  extend type Mutation {
    createProject(input: CreateProjectInput!): Project
    joinProject(projectId: ID!): Boolean!
  }

  extend type Query {
    projects: [Project]
    project(projectId: ID!): Project
  }
`;
