import { IUser } from '../../models/User';
import { IContext } from '../../types';

interface IMe extends Pick<IUser, 'email'> {}

export const me = async (ctx: IContext) => {
  if (!ctx?.user) {
    console.log('no user');
    return null;
  }

  const user: IMe = {
    email: ctx.user.email,
  };

  return user;
};
