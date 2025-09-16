import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  lessonName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  taskEndSchedule: {
    type: Date,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const taskModel = model("Task", taskSchema);
