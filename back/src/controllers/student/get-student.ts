import { studentModel } from "../../models/student.model";
import { RequestHandler } from "express";

export const getStudentController: RequestHandler = async (req, res) => {
  const student = await studentModel.find();
  res.status(200).json(student);
};
