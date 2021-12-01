import { ProjectModel } from '../../models/Project';
import { IContext } from '../../types';

export const joinProject = async (projectId: string, ctx: IContext) => {
  try {
    await ProjectModel.findByIdAndUpdate(
      { _id: projectId },
      {
        $push: {
          members: [
            {
              userId: ctx.user._id,
              firstName: ctx.user.firstName,
              lastName: ctx.user.lastName,
            },
          ],
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
};
