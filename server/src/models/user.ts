import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface IUser extends Document {
  userName: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<IUser>('Users', userSchema);
export { User, type IUser };
