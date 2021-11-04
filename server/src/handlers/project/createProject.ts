import { ProjectModel } from '../../models/Project';
import { IContext, IRole } from '../../types';

export interface ICreateProjectInput {
  title: string;
  description: string;
  kickoff: string;
  technologies: string[];
  roles: IRole[];
}

export const createProject = async (
  input: ICreateProjectInput,
  ctx: IContext
) => {
  try {
    console;
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
