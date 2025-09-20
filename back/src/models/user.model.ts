import { Schema, model } from "mongoose";

enum Role {
  Student = "Student",
  Teacher = "Teacher",
  Parents = "Parents",
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Role,
    required: true,
  },
});

export const userModel = model("user", userSchema);
