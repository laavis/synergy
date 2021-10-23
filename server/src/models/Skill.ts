import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';
import { ESkillType } from '../types';

export class Skill {
  @prop({ required: true })
  public type!: ESkillType;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public level!: number;

  public description?: string;
}

export interface ISkill extends Skill {
  _id: mongoose.Types.ObjectId;
}

export const SkillModel = getModelForClass(Skill);
