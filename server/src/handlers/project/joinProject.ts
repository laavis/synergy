import { IContext } from '../../types';

export const joinProject = async (projectId: string, ctx: IContext) => {
  try {
    await ProjectModel.findByIdAndUpdate(
      { _id: args.projectId },
      {
        $push: {
          members: [ctx.user._id],
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
