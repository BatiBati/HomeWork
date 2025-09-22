import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";

export const getAssignmentById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await assignmentModel.findById(id).populate("teacher");
    res.status(200).json({
      assignment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fetch assignment server error" });
  }
};
