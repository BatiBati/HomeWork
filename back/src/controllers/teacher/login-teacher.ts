import { Request, Response } from "express";
import { teacherModel } from "../../models/teacher.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const teacher = await teacherModel
      .findOne({
        email: email.trim().toLowerCase(),
      })
      .populate("students")
      .populate("tasks");
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password or email" });
      return;
    }

    const token = jwt.sign(
      { _id: teacher._id.toString(), email: teacher.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(200).json({
      message: "Logged in successfully",
      token,
      teacher: {
        _id: teacher._id,
        teacherName: teacher.teacherName,
        email: teacher.email,
        school: teacher.school,
        grade: teacher.grade,
        students: teacher.students,
        tasks: teacher.tasks,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
