import { IResolvers } from '@graphql-tools/utils';

import handlers from './handlers';
import { ICreateUser } from './handlers/user/signup';
import { ILoginUserInput } from './handlers/user/login';

import { UserModel } from './models/User';

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void, ctx): string {
      return `👋 Hello world! 👋`;
    },
    async users(_: void, args: void, ctx) {
      return UserModel.find({});
    },
  },
  Mutation: {
    async signup(_, args: { input: ICreateUser }) {
      return await handlers.user.signup(args.input);
    },
    async login(_: void, args: ILoginUserInput) {
      console.log('login');
      return await handlers.user.login(args);
    },
    async renewAccessToken(_, args: { refreshToken: string }) {
      return await handlers.accessToken.renew(args.refreshToken);
    },
  },
};
export default resolverMap;
