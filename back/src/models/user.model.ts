import { Schema, model } from "mongoose";

const userSchema = new Schema({
  parentName: { required: true, type: String },
  studentName: { required: true, type: String },
});

export const userModel = model("Student", userSchema);
