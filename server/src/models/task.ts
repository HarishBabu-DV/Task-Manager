import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

interface ITask extends Document {
  taskName: string;
  description: string;
}

const taskSchema = new Schema<ITask>({
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const Task = mongoose.model<ITask>('Tasks', taskSchema);
export { Task, type ITask };
