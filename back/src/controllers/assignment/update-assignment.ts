import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";

export const updateAssignment: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { lessons, dayCares, images, publicLinks } = req.body;
console.log(id);

  try {
    const updatedAssignment = await assignmentModel.findByIdAndUpdate(
        id,
      { lessons, dayCares, images, publicLinks },
      { new: true }
    );

    if (!updatedAssignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }

    res.status(200).json({
      message: "Assignment updated successfully",
      assignment: updatedAssignment,
    });
  } catch (error) {
    console.error("Update assignment error:", error);
    res.status(500).json({ message: "Update assignment server error" });
  }
};
