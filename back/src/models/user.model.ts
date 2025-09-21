import { Schema, model } from "mongoose";

enum Role {
  Teacher = "teacher",
  Parents = "parents",
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    daycareEmail: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
    grade: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
      default: Role.Teacher,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "children",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export const userModel = model("user", userSchema);
