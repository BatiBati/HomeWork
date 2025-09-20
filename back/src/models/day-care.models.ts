import { Schema, model, Types } from "mongoose";

const daycareSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    children: [
      {
        type: Types.ObjectId,
        ref: "Student",
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const DaycareModel = model("Daycare", daycareSchema);
