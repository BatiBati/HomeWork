import { RequestHandler } from "express";
import { teacherModel } from "../../models/teacher.model";
import jwt from "jsonwebtoken";

export const loginTeacherController: RequestHandler = async (req, res) => {
  const { teacherName, password } = req.body;

  try {
    // Find teacher by teacherName
    const teacher = await teacherModel.findOne({ teacherName });
    if (!teacher) {
      res.status(401).json({ 
        message: "Invalid teacher name or password" 
      });
      return;
    }

    // Compare password manually since comparePassword is not available on the type
    const bcrypt = require("bcryptjs");
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      res.status(401).json({ 
        message: "Invalid teacher name or password" 
      });
      return;
    }

    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign(
      { 
        teacherId: teacher._id, 
        teacherName: teacher.teacherName 
      },
      JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7 days
    );

    // Remove password from response for security
    const teacherResponse = {
      _id: teacher._id,
      teacherName: teacher.teacherName,
      school: teacher.school,
      grade: teacher.grade,
      students: teacher.students,
      homeworks: teacher.homeworks,
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
    };

    res.status(200).json({ 
      message: "Login successful", 
      teacher: teacherResponse,
      token: token
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: "Failed to login" 
    });
  }
};
