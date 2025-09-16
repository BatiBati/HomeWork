import { RequestHandler } from "express";
import { teacherModel } from "../../models/teacher.model";

export const getMe: RequestHandler = async (req, res): Promise<void> => {
  try {
    const teacherId = (req as any).teacher?._id;
    if (!teacherId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const teacher = await teacherModel
      .findById(teacherId)
      .populate("tasks")
      .populate("students");

    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.status(200).json({ teacher });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
