import { gql } from 'apollo-server-core';
import { ERole } from '../types';

export const projectTypeDefs = gql`
  enum ERole {
    ${Object.values(ERole).join('\n')}
  }

  type Role {
    type: ERole!
    # Role name if type is 'other'
    name: String
    skillLevel: Int!
    description: String
    # Ids of the users who has accepted the role
    person: [ID!]
  }

  type Project {
    title: String!
    # User's id who has created the project
    createdBy: ID!
    # Date when project has been set to start
    kickoffDate: String
    # Detailed description of the project
    description: String!
    # Short description of the project
    excerpt: String!
    # Stack used for the project, e.g. Node.js, React, TypeScript
    stack: [String!]
    # Project roles
    roles: Role!
  }
`;
