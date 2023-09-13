import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../../config';

async function DBConnect() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('Connect database successfully');
  } catch (error) {
    console.log(error);
  }
}

export { DBConnect };
