import { model, Schema } from "mongoose";

const lessonSchema = new Schema(
  {
    lessonName: { type: String, required: true },
    taskDescription: { type: String, required: true },
    childrens: [
      {
        type: Schema.Types.ObjectId,
        ref: "children",
        required: true,
      },
    ],
  },
  { _id: false }
);

const assignmentSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    taskEndSchedule: {
      type: Date,
      required: true,
    },
    childrens: [
      {
        type: Schema.Types.ObjectId,
        ref: "children",
        required: true,
      },
    ],
    lessons: [lessonSchema],

    images: [
      {
        type: String,
        required: false,
      },
    ],
    publicLinks: [
      {
        token: String,
        sharedBy: {
          type: String,
          enum: ["Teacher", "Parent"],
        },
        expireAt: Date,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const assignmentModel = model("Assignment", assignmentSchema);
