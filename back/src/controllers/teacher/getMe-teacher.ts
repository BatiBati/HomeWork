import { RequestHandler } from "express";
import { teacherModel } from "../../models/teacher.model";
import jwt from "jsonwebtoken";

export const getMeTeacher: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access token required" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as {
      _id: string;
      teacherName: string;
    };

    const teacher = await teacherModel.findById(decoded._id);
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.status(200).json({
      _id: teacher._id,
      teacherName: teacher.teacherName,
      school: teacher.school,
      grade: teacher.grade,
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
