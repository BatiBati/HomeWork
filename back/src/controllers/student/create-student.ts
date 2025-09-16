import { RequestHandler } from "express";
import { studentModel } from "../../models/student.model";
import { teacherModel } from "../../models/teacher.model";
import jwt from "jsonwebtoken";

export const loginOrRegisterStudentController: RequestHandler = async (
  req,
  res
) => {
  const { parentname, childname, teacherId } = req.body;

  if (!parentname || !childname || !teacherId) {
    res.status(400).json({
      message: "Parent name, child name, and teacher ID are required",
    });
    return;
  }

  try {
    // 1. Check if teacher exists
    const teacher = await teacherModel.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    // 2. Check if student already exists
    let student = await studentModel.findOne({ parentname, childname });

    // 3. Create new student if not exists
    if (!student) {
      student = await studentModel.create({
        parentname,
        childname,
        teacherId,
        homeworks: [], // This will hold the assigned tasks
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Add student to teacher
      await teacherModel.findByIdAndUpdate(teacherId, {
        $addToSet: { students: student._id },
        updatedAt: new Date(),
      });
    }

    // 4. Optionally populate homeworks if you store them as references
    await student.populate("homeworks"); // only needed if homeworks is an array of ObjectId referencing tasks

    // 5. Create JWT token with student info
    const token = jwt.sign(
      {
        _id: student._id.toString(),
        parentname: student.parentname,
        childname: student.childname,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // 6. Return token + student + homeworks
    res.status(200).json({
      message:
        student.createdAt === student.updatedAt
          ? "Registered & logged in"
          : "Logged in",
      token,
      student: {
        _id: student._id,
        parentname: student.parentname,
        childname: student.childname,
        homeworks: student.homeworks, // <-- include tasks here
      },
    });
  } catch (error) {
    console.error("Login/Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
