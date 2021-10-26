import { IResolvers } from '@graphql-tools/utils';

import handlers from './handlers';
import { ILoginUserInput } from './handlers/user/login';
import { IUpdateUserInput, updateUser } from './handlers/user/updateUser';

import { UserModel } from './models/User';
import { IContext } from './types';

const resolverMap: IResolvers = {
  Query: {
    helloWorld(_: void, args: void, ctx): string {
      return `👋 Hello world! 👋`;
    },
    async users(_: void, args: void, ctx) {
      return UserModel.find({});
    },
    async me(_: void, args: void, ctx) {
      return await handlers.user.me(ctx);
    },
    async renewAccessToken(_, args: { refreshToken: string }) {
      const access = await handlers.accessToken.renew(args.refreshToken);
      return access;
    },
  },
  Mutation: {
    async createUser(
      _,
      args: {
        email: string;
        password: string;
        rePassword: string;
        firstName: string;
        lastName: string;
      }
    ) {
      console.log('resolverMap');
      console.log(args);
      return await handlers.user.create(args);
    },
    async updateUser(_, args: { input: IUpdateUserInput }, ctx: IContext) {
      return await updateUser(args.input, ctx);
    },
    async login(_: void, args: ILoginUserInput) {
      return await handlers.user.login(args);
    },
  },
};
export default resolverMap;
