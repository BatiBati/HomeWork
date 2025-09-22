import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";

export const updateAssignment: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { lessons, dayCares, images, publicLinks, taskEndSchedule } = req.body;
  console.log(id);

  try {
    const update: any = { lessons, dayCares, images, publicLinks };
    if (taskEndSchedule) {
      update.taskEndSchedule = new Date(taskEndSchedule);
    }

    const updatedAssignment = await assignmentModel.findByIdAndUpdate(
      id,
      update,
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
