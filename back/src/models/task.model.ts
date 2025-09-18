import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  lessonName: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  taskEndSchedule: {
    type: Date,
    required: true,
  },
  homeworks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Homework",
    },
  ],
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const taskModel = model("Task", taskSchema);
