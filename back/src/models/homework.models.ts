import mongoose, { model, Schema } from "mongoose";

const homeworkSchema = new Schema({
  taskId:{type:mongoose.Schema.Types.ObjectId,ref:"Task"},
  description: { type: String,
   },
  studentId:{type:mongoose.Schema.Types.ObjectId,ref:"Student"},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const homeworkModel = model("Homework", homeworkSchema);