import { AuthenticationError } from 'apollo-server-errors';
import { UserModel } from '../../models/User';
import { ESkillType, IContext, TSkillLevel } from '../../types';

interface ISkill {
  type: ESkillType;
  name: string;
  level: TSkillLevel;
  description?: string;
}

export interface IUpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: {
    country?: string;
    city?: string;
  };
  skills?: ISkill[];
}

export const updateUser = async (input: IUpdateUserInput, ctx: IContext) => {
  const { skills, ...userDetails } = input;
  console.log(skills?.map(skill => typeof skill.type));

  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: ctx.user._id },
      {
        $set: userDetails,
        $push: {
          skills,
        },
      },
      {
        multi: true,
        new: true,
      }
    );

    return user;
  } catch (error) {
    // todo handle
    console.error(error);
  }
};
