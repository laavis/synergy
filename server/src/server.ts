import express from 'express';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import dotenv from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';
import { createServer } from 'http';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import { connectDatabase } from './util/database';
import { permissions, validateAccessToken } from './util';

dotenv.config();

const app = express();

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  validationRules: [depthLimit(7)],
  context: async ({ req, res }) => ({
    req,
    res,
    user: await validateAccessToken(req),
  }),
});

(async () => {
  await connectDatabase(process.env.MONGO_URI as string);
  app.use(json());
  app.use(cors());
  app.use(compression());

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  const httpServer = createServer(app);
  httpServer.listen({ port: 3000 }, (): void =>
    console.log(`\n🚀 GraphQL is now running on http://localhost:3000/graphql`)
  );
})();
