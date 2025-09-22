import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";

export const getAssignmentsByTeacher: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Find all assignments created by this teacher
    const assignments = await assignmentModel
      .find({ teacher: id })
      .populate("teacher")
      .populate("childrens")
      .sort({ createdAt: -1 });

    res.status(200).json({
      assignments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch assignments server error" });
  }
};
