import { RequestHandler } from "express";
import { studentModel } from "../../models/student.model";
import { teacherModel } from "../../models/teacher.model";
import jwt from "jsonwebtoken";

export const loginOrRegisterStudentController: RequestHandler = async (req, res) => {
  const { parentname, childname, teacherId } = req.body;

  if (!parentname || !childname || !teacherId) {
    res.status(400).json({ message: "Parent name, child name, and teacher ID are required" });
    return;
  }

  try {
    
    // 1. Check if teacher exists
    const teacher = await teacherModel.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    // 2. Check if student with parentname + childname exists
    let student = await studentModel.findOne({ parentname, childname });

    // 3. If student doesn't exist, create new student
    if (!student) {
      student = await studentModel.create({
        parentname,
        childname,
        teacherId,
        homeworks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Add student to teacher's students array
      await teacherModel.findByIdAndUpdate(
        teacherId,
        { 
          $addToSet: { students: student._id },
          updatedAt: new Date()
        }
      );
    }

    // 3. JWT token үүсгэх
    const token = jwt.sign(
      {
        _id: student._id,
        parentname: student.parentname,
        childname: student.childname,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // 4. Token-ийг cookie-д хадгалах (эсвэл frontend-д буцаах)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      message: student.createdAt === student.updatedAt ? "Registered & logged in" : "Logged in",
      token,
      student: {
        _id: student._id,
        parentname: student.parentname,
        childname: student.childname,
      },
    });

  } catch (error) {
    console.error("Login/Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
