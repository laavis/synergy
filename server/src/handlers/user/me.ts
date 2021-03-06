import { IUser } from '../../models/User';
import { IContext } from '../../types';

interface IMe extends Pick<IUser, 'email' | '_id'> {}

export const me = async (ctx: IContext) => {
  if (!ctx?.user) {
    return null;
  }

  const user: IMe = {
    _id: ctx.user._id,
    email: ctx.user.email,
  };

  return user;
};
