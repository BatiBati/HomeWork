import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";

export const getAssignmentsByTeacher: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const assignments = await assignmentModel.findById(id).populate("teacher");

    res.status(200).json({
      assignments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch assignments server error" });
  }
};
