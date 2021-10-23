import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from './resolverMap';
import * as typeDefs from './schema/schema.graphql';
import { gql } from 'apollo-server-core';
import { userTypeDefs } from './schema/user';
import { skillTypeDefs } from './schema/skill';
import { tokenTypeDefs } from './schema/token';
import { projectTypeDefs } from './schema/project';

const baseTypeDefs = gql`
  type Query {
    helloWorld: String!
  }
  type Mutation
`;

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    baseTypeDefs,
    skillTypeDefs,
    projectTypeDefs,
    userTypeDefs,
    tokenTypeDefs,
  ],
  resolvers,
});

export default schema;
