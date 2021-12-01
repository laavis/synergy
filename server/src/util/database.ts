import { mongoose } from '@typegoose/typegoose';

export const connectDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {}
};
