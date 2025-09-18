import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  parentname: { type: String, required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  childname: { type: String, required: true },
  homeworks: [{ type: Schema.Types.ObjectId, ref: "Homework" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  parentEmail: { type: String, required: false },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export const studentModel = model("Student", studentSchema);
