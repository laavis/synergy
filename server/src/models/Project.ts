import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
  Severity,
} from '@typegoose/typegoose';
import { IDeveloperRole } from '../types';

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
  developerRoles!: IDeveloperRole[];

  @prop()
  tags?: string[];

  @prop()
  members?: mongoose.Types.ObjectId[];

  @prop()
  kickoffDate?: string;
}

export interface IProject extends Project {}

export const ProjectModel = getModelForClass(Project);
