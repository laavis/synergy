import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';
import { ESkillType } from '../types';

export class Skill {
  // _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public type!: ESkillType;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public level!: number;

  @prop()
  public description?: string;
}

export interface ISkill extends Skill {}
