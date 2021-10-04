import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';

export class TokenPair {
  @prop({ required: true })
  public accessToken!: string;

  @prop({ required: true })
  public refreshToken!: string;

  @prop({ required: true })
  public userId!: mongoose.Types.ObjectId;
}

export interface ITokenPair extends TokenPair {
  _id: mongoose.Types.ObjectId;
}

export const TokenPairModel = getModelForClass(TokenPair);
