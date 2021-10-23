import { mongoose } from '@typegoose/typegoose';

export const connectDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);

    console.log(`\n👌 DB connection ok`);
  } catch (error) {
    console.log(error);
  }
};
