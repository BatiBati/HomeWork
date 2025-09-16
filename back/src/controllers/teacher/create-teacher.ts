import { RequestHandler } from "express";
import { teacherModel } from "../../models/teacher.model";

export const createTeacher: RequestHandler = async (req, res) => {
  const { teacherName, password, school, grade, student, task } = req.body;

  try {
    const teacher = await teacherModel.create({
      teacherName,
      password,
      school,
      grade,
      student,
      task,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "Teacher created", teacher });
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
};
