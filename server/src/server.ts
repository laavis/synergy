import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import cors from 'cors';
import { json } from 'body-parser';
import { createServer } from 'http';
import { verify } from 'jsonwebtoken';
import { applyMiddleware } from 'graphql-middleware';

import schema from './schema';
import { connectDatabase } from './util/database';
import { permissions } from './util/permissions';

const getUser = (accessToken: string) => {
  try {
    return verify(accessToken, process.env.ACCESS_SECRET);
  } catch (error) {
    throw new Error('Session invalid');
  }
};

const app = express();

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  validationRules: [depthLimit(7)],
  context: ({ req }) => {
    const authorization = req.headers.authorization;

    if (!authorization) return null;

    const [_, accessToken] = authorization.split(' ');

    if (!accessToken) return null;

    const user = getUser(accessToken);
    return { user };
  },
});

(async () => {
  await connectDatabase(process.env.MONGO_URI);
  app.use(json());
  app.use(cors());
  app.use(compression());

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  const httpServer = createServer(app);
  httpServer.listen({ port: 3000 }, (): void => console.log(`\n🚀 GraphQL is now running on http://localhost:3000/graphql`));
})();
