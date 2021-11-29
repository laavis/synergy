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
      ...input,
    });

    return newProject;
  } catch (error) {
    console.log(error);
  }
};
