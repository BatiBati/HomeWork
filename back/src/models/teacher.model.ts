import { model, Schema, Document } from "mongoose";

export interface ITeacher extends Document {
  email: string;
  teacherName: string;
  password: string;
  school: string;
  grade: string;
  students: string[];
  homeworks: string[];
  createdAt: Date;
  updatedAt: Date;
}

const teacherSchema = new Schema<ITeacher>({
  email: { type: String, unique: true, required: true },
  teacherName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  school: { type: String, required: true },
  grade: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  homeworks: [{ type: Schema.Types.ObjectId, ref: "Homework" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const teacherModel = model<ITeacher>("Teacher", teacherSchema);
