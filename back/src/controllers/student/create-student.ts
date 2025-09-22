import { RequestHandler } from "express";
import { studentModel } from "../../models/student.model";
import { teacherModel } from "../../models/teacher.model";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/user.model";

export const loginOrRegisterStudentController: RequestHandler = async (
  req,
  res
) => {
  const { parentname, childname, teacherId, parentEmail } = req.body;

  if (!parentname || !childname || !teacherId) {
    res.status(400).json({
      message: "Parent name, child name, and teacher ID are required",
    });
    return;
  }

  try {
    let teacher = await teacherModel.findById(teacherId);
    if (!teacher) {
      const user = await userModel.findById(teacherId);
      if (user) {
        const existingTeacherByEmail = await teacherModel.findOne({
          email: user.email.trim().toLowerCase(),
        });

        if (existingTeacherByEmail) {
          teacher = existingTeacherByEmail;
        } else {
          teacher = await teacherModel.create({
            teacherName: `${user.firstName} ${user.lastName}`.trim(),
            email: user.email.trim().toLowerCase(),
            password: user.password,
            school: user.school?.toString() || "",
            grade: user.grade?.toString() || "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }

    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    let student = await studentModel.findOne({
      parentname,
      childname,
      teacherId: teacher._id,
    });

    if (!student) {
      student = await studentModel.create({
        parentname,
        childname,
        teacherId: teacher._id,
        parentEmail,
        homeworks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await teacherModel.findByIdAndUpdate(teacher._id, {
        $addToSet: { students: student._id },
        updatedAt: new Date(),
      });
    }

    await student.populate("homeworks");

    const token = jwt.sign(
      {
        _id: student._id.toString(),
        parentname: student.parentname,
        childname: student.childname,
        parentEmail: student.parentEmail,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(200).json({
      message:
        student.createdAt.getTime() === student.updatedAt.getTime()
          ? "Registered & logged in"
          : "Logged in",
      token,
      student: {
        _id: student._id,
        parentname: student.parentname,
        childname: student.childname,
        parentEmail: student.parentEmail,
        homeworks: student.homeworks,
      },
    });
  } catch (error) {
    console.error("Login/Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
