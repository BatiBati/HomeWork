import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";
import { childrenModel } from "../../models/children.models";
import { sendHomeworkAddedNotification } from "../../utils/mail-handler";

export const createAssignment: RequestHandler = async (req, res) => {
  const { teacher, lessons, images, publicLinks, taskEndSchedule } = req.body;

  const childrens = await childrenModel
    .find({ teacher: teacher })
    .populate("parents", "email daycareEmail")
    .select("_id parents firstName lastName");

  if (!childrens.length) {
    res.status(404).json({ message: "Teacher has no children" });
    return;
  }

  try {
    const newAssignment = await assignmentModel.create({
      teacher,
      childrens: childrens.map((c) => c._id),
      lessons,
      taskEndSchedule: new Date(taskEndSchedule),
      images,
      publicLinks,
    });

    await childrenModel.updateMany(
      { teacher: teacher },
      { $push: { assignment: newAssignment._id } }
    );
    // Get all unique parent emails and daycare emails
    const parentEmails = [];
    const daycareEmails = [];

    childrens.forEach((child) => {
      if (child.parents && (child.parents as any).email) {
        const parentEmail = (child.parents as any).email;
        if (!parentEmails.includes(parentEmail)) {
          parentEmails.push(parentEmail);
        }

        const daycareEmail = (child.parents as any).daycareEmail;
        if (daycareEmail && !daycareEmails.includes(daycareEmail)) {
          daycareEmails.push(daycareEmail);
        }
      }
    });

    console.log("📧 All parent emails:", parentEmails);
    console.log("📧 All daycare emails:", daycareEmails);

    // Send notifications to all parents and daycares
    if (parentEmails.length > 0 || daycareEmails.length > 0) {
      sendHomeworkAddedNotification(
        childrens.map((c) => ({
          firstName: c.firstName,
          lastName: c.lastName,
          parents: [
            {
              email: (c.parents as any).email,
              daycareEmail: (c.parents as any).daycareEmail || "",
            },
          ],
        })),
        newAssignment.lessons,
        newAssignment.taskEndSchedule.toISOString()
      );
    }
    res.status(201).json({
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
  } catch (error) {
    console.error("Create assignment error:", error);
    res.status(500).json({
      message: "Create assignment server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
