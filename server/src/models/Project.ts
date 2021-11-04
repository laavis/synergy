import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
  Severity,
} from '@typegoose/typegoose';
import { ERole, IRole, TSkillLevel } from '../types';

@modelOptions({
  schemaOptions: { collection: 'projects' },
  options: { allowMixed: Severity.ALLOW },
})
export class Project {
  _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  public createdBy!: mongoose.Types.ObjectId;

  @prop({ required: true })
  roles!: IRole[];

  @prop()
  technologies?: string[];

  @prop()
  kickoff?: string;
}

export interface IProject extends Project {}

export const ProjectModel = getModelForClass(Project);
