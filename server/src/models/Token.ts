import {
  prop,
  getModelForClass,
  mongoose,
  modelOptions,
} from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'tokens' } })
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
