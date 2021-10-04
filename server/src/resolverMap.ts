import { IResolvers } from '@graphql-tools/utils';

import handlers from './handlers';
import { ICreateUser } from './handlers/user/create';
import { ILoginUserInput } from './handlers/user/login';

import { UserModel } from './models/User';

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void, ctx): string {
      console.log(ctx);
      return `👋 Hello world! 👋`;
    },
    async users(_: void, args: void, ctx) {
      return UserModel.find({});
    },
  },
  Mutation: {
    async createUser(_, args: { input: ICreateUser }) {
      return await handlers.user.create(args.input);
    },
    async loginUser(_: void, args: ILoginUserInput) {
      return await handlers.user.login(args);
    },
    async renewAccessToken(_, args: { refreshToken: string }) {
      return await handlers.accessToken.renew(args.refreshToken);
    },
  },
};
export default resolverMap;
