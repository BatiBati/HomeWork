import { RequestHandler } from "express";
import { teacherModel } from "../../models/teacher.model";
import jwt from "jsonwebtoken";

export const registerTeacherController: RequestHandler = async (req, res) => {
  const { teacherName, password, school, grade } = req.body;

  try {
    // Input validation
    if (!teacherName || !password || !school || !grade) {
      res.status(400).json({ 
        message: "Teacher name, password, school, and grade are required" 
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ 
        message: "Password must be at least 6 characters long" 
      });
      return;
    }

    // Create new teacher (password will be automatically hashed by pre-save middleware)
    const teacher = await teacherModel.create({
      teacherName,
      password,
      school,
      grade,
      students: [],
      homeworks: [],
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    // Generate JWT token for immediate login after signup
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign(
      { 
        teacherId: teacher._id, 
        teacherName: teacher.teacherName 
      },
      JWT_SECRET,
      { expiresIn: "7d" }
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

    res.status(201).json({ 
      message: "Teacher registered successfully", 
      teacher: teacherResponse,
      token: token
    });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: "Failed to create teacher" 
    });
  }
};
