import { model, Schema } from "mongoose";

const lessonSchema = new Schema(
  {
    lessonName: { type: String, required: true },
    taskDescription: { type: String, required: true },
    images: [
      {
        type: String,
        required: false,
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
    childrens: [
      {
        type: Schema.Types.ObjectId,
        ref: "children",
        required: true,
      },
    ],
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

export const assignmentModel = model("Assignment", assignmentSchema);
