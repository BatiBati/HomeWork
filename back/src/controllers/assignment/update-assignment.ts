import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";
import { childrenModel } from "../../models/children.models";
import { sendHomeworkEditedNotification } from "../../utils/edit.mail";

export const updateAssignment: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { lessons, dayCares, images, publicLinks, taskEndSchedule } = req.body;

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

    // Fetch children under this assignment's teacher to notify
    const childrens = await childrenModel
      .find({ teacher: updatedAssignment.teacher })
      .populate("parents", "email daycareEmail")
      .select("_id parents firstName lastName grade school");

    if (childrens.length) {
      const lessonSummary = (updatedAssignment.lessons || []).map((l: any) => ({
        lessonName: l.lessonName,
        taskDescription: l.taskDescription,
      }));

      await sendHomeworkEditedNotification(
        childrens
          .filter((c) => c.parents && typeof c.parents === "object")
          .map((c) => ({
            firstName: c.firstName,
            lastName: c.lastName,
            parents: [
              {
                email: (c.parents as any)?.email || "",
                daycareEmail: (c.parents as any)?.daycareEmail || "",
              },
            ],
            grade: c.grade,
            school: c.school,
          })),
        lessonSummary,
        updatedAssignment as any
      );
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
