import { model, Schema } from "mongoose";

const teacherSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  task: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  updatedAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export const teacherModel = model("Teacher", teacherSchema);
