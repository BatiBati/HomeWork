import mongoose, { model, Schema } from "mongoose";

const homeworkSchema = new Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: false },
  image: [{ type: String, require: true }],
});

export const homeworkModel = model("Homework", homeworkSchema);
