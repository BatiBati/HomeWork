import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
  {
    homework: {
      type: Types.ObjectId,
      ref: "Homework",
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = model("Comment", commentSchema);
