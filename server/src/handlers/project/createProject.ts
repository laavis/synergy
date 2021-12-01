import { ProjectModel } from '../../models/Project';
import { IContext, IDeveloperRole } from '../../types';

export interface ICreateProjectInput {
  title: string;
  description?: string;
  kickoffDate?: string;
  tags: string[];
  developerRoles: IDeveloperRole[];
}

export const createProject = async (
  input: ICreateProjectInput,
  ctx: IContext
) => {
  try {
    const createdBy = ctx.user._id;

    const newProject = await ProjectModel.create({
      createdBy,
      members: [
        {
          userId: ctx.user._id,
          firstName: ctx.user.firstName,
          lastName: ctx.user.lastName,
        },
      ],
      ...input,
    });

    return newProject;
  } catch (error) {
    console.log(error);
  }
};
