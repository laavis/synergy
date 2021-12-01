import { TokenPairModel } from '../../models/Token';
import { IContext } from '../../types';

export const logout = async (ctx: IContext) => {
  if (!ctx?.user) {
    console.log('no user');
    return null;
  }

  try {
    await TokenPairModel.findOneAndDelete({ userId: ctx.user._id });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
