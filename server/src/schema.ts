import 'graphql-import-node';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

import resolvers from './resolverMap';
import * as typeDefs from './schema/schema.graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
