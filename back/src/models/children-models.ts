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
    parents: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    grade: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
export const childrenModel = model("children", childrenSchema);
