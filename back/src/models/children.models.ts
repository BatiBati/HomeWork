import { Schema, model } from "mongoose";

const childrenSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    parents: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    grade: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
    assignment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
  },
  { timestamps: true }
);
export const childrenModel = model("children", childrenSchema);
