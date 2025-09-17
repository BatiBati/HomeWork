import { RequestHandler } from "express";
import { teacherModel } from "../../models/teacher.model";

export const getTeacherById: RequestHandler = async (req, res) => {
  try {
    const teacher = await teacherModel
      .findById(req.params.id)
      .populate("students")
      .populate("tasks"); // <--- энд populate хийж байна
    if (!teacher) {
      res.status(404).json({
        message: "Teacher not found",
      });
      return;
    }
    res.status(200).json({
      message: "Teacher fetched successfully",
      teacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get Teacher by id server error",
      error,
    });
  }
};
