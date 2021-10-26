import {
  prop,
  getModelForClass,
  mongoose,
  modelOptions,
} from '@typegoose/typegoose';
import { Skill } from './Skill';

class Location {
  @prop({ required: false })
  public city?: string;

  @prop({ required: false })
  public country?: string;
}

@modelOptions({ schemaOptions: { collection: 'users' } })
export class User {
  _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop()
  public bio?: string;

  @prop()
  public location?: Location;

  @prop()
  public skills?: Skill[];
}

export interface IUser extends User {}

export const UserModel = getModelForClass(User);
