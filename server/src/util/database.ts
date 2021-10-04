import { mongoose } from '@typegoose/typegoose';

export const connectDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);

    // const { _id: id } = await UserModel.create({ email: 'test@test.com', password: '1234' } as User);
    // const user = await UserModel.findById(id).exec();

    // console.log(user);
    console.log(`\n👌 DB connection ok`);
  } catch (error) {
    console.log(error);
  }
};
