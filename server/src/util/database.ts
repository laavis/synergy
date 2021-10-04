import { mongoose } from '@typegoose/typegoose';
import { User, UserModel } from '../models/User';

export const connectDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);

    // const { _id: id } = await UserModel.create({ email: 'test@test.com', password: '1234' } as User);
    // const user = await UserModel.findById(id).exec();

    // console.log(user);
    console.log('db connection OK');
  } catch (error) {
    console.log(error);
  }
};
