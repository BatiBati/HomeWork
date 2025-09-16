import { Request, Response } from "express";
import { teacherModel } from "../../models/teacher.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { teacherName, email, password, school, grade } = req.body;

  if (!teacherName || !email || !password || !school || !grade) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    // Check if teacher already exists
    const existingTeacher = await teacherModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingTeacher) {
      res
        .status(409)
        .json({ message: "Teacher with this email already exists" });
      return;
    }

    // Hash the password WITHOUT trimming (trimming can cause issues)
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await teacherModel.create({
      teacherName: teacherName.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      school: school.trim(),
      grade: grade.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Don't send password back in response
    const { password: _, ...teacherResponse } = teacher.toObject();

    res.status(201).json({
      message: "Teacher created successfully",
      teacher: teacherResponse,
    });
  } catch (error: any) {
    console.error("Create teacher error:", error);

    // Handle duplicate key error (if email has unique constraint)
    if (error.code === 11000) {
      res
        .status(409)
        .json({ message: "Teacher with this email already exists" });
      return;
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
    console.log("Login attempt for email:", email.trim().toLowerCase());

    const teacher = await teacherModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!teacher) {
      console.log("Teacher not found in database");
      res.status(401).json({ message: "Invalid email or password" }); // Don't reveal which field is wrong
      return;
    }

    console.log("Teacher found, comparing passwords...");
    console.log("Input password length:", password.length);
    console.log("Stored hash length:", teacher.password.length);

    // Compare password WITHOUT trimming the input password
    const isMatch = await bcrypt.compare(password, teacher.password);

    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password comparison failed");
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not configured");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const token = jwt.sign(
      {
        _id: teacher._id.toString(),
        email: teacher.email,
        teacherName: teacher.teacherName,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    console.log("Login successful for teacher:", teacher.email);

    res.status(200).json({
      message: "Logged in successfully",
      token,
      teacher: {
        _id: teacher._id,
        teacherName: teacher.teacherName,
        email: teacher.email,
        school: teacher.school,
        grade: teacher.grade,
      },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

// Helper function for debugging (remove in production)
export const debugTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.params;

  try {
    const teacher = await teacherModel.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.json({
      email: teacher.email,
      passwordHash: teacher.password,
      passwordHashLength: teacher.password.length,
      createdAt: teacher.createdAt,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
