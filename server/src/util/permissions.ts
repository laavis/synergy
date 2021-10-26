import { and, rule, shield } from 'graphql-shield';
import { IContext } from '../types';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx: IContext, info) => {
    return ctx.user !== null;
  }
);

export const permissions = shield({
  Query: {
    helloWorld: and(isAuthenticated),
  },
  Mutation: {
    updateUser: and(isAuthenticated),
  },
});
