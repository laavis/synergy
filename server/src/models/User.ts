import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';
import { Skill } from './Skill';

export class User {
  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  public bio?: string;

  public location?: {
    country?: string;
    city?: string;
  };

  public skills?: Skill[];
}

export interface IUser extends User {
  _id: mongoose.Types.ObjectId;
}

export const UserModel = getModelForClass(User);
