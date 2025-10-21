import chalk from 'chalk';
import mongoose from 'mongoose';
import { info, error } from 'node:console';
const { blue, red } = chalk;
const connectToDB = async (): Promise<void> => {
  const { MONGODB_URI } = process.env;
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI is not defined in environment variables');
  }
  try {
    await mongoose.connect(MONGODB_URI);
    info(blue('Server connected to MongoDB'));
  } catch (err) {
    error(red(err));
    process.exit(1);
  }
};

export default connectToDB;
