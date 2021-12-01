import { TokenPairModel } from '../../models/Token';
import { IContext } from '../../types';

export const logout = async (ctx: IContext) => {
  if (!ctx?.user) {
    return null;
  }

  try {
    await TokenPairModel.findOneAndDelete({ userId: ctx.user._id });

    return true;
  } catch (error) {
    return false;
  }
};
