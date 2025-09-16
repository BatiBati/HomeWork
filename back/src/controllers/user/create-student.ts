import { Request, Response } from "express";
import { teacherModel } from "../../models/teacher.model";
import { userModel } from "../../models/user.model"; // your Student model

export const createStudentForTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { teacherId, parentName, studentName } = req.body;

  if (!teacherId || !parentName || !studentName) {
    res
      .status(400)
      .json({ error: "teacherId, parentName and studentName are required" });
    return;
  }

  try {
    // 1️⃣ Create the student
    const student = await userModel.create({
      parentName,
      studentName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 2️⃣ Add the student's ID to teacher's students array
    const teacher = await teacherModel.findByIdAndUpdate(
      teacherId,
      { $push: { students: student._id }, updatedAt: new Date() },
      { new: true } // return updated document
    );

    if (!teacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }

    res.status(201).json({
      message: "Student created and added to teacher",
      student,
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error });
  }
};
