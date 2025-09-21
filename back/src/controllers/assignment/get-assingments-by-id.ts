import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";

export const getAssignmentsByTeacher: RequestHandler = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      res.status(400).json({ message: "Teacher ID is required" });
      return;
    }

    const assignments = await assignmentModel
      .find({ teacher: teacherId })
      .populate("childrens");

    res.status(200).json({
      message: "Assignments fetched successfully",
      assignments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch assignments server error" });
  }
};
