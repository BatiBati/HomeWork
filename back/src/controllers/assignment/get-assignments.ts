import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";

export const getAssignments: RequestHandler = async (req, res) => {
  try {
    const assignment = await assignmentModel
      .find({})
      .populate("childrens")
      .populate("teacher");
    res.status(200).json({
      message: "All users fetched successfully",
      assignment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fetch assignment server error" });
  }
};
