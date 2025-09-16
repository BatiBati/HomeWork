import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  TeacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  lessonName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  homeWork: {
    type: Schema.Types.ObjectId,
    ref: "HomeWork",
    required: true,
  },
  taskEndSchedule: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export const taskModel = model("Task", taskSchema);
