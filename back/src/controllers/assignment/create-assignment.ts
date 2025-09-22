import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";
import { childrenModel } from "../../models/children.models";
import { sendHomeworkAddedNotification } from "../../utils/mail-handler";

export const createAssignment: RequestHandler = async (req, res) => {
  const { teacher, lessons, images, taskEndSchedule } = req.body;

  const childrens = await childrenModel
    .find({ teacher: teacher })
    .populate("parents", "email daycareEmail")
    .select("_id parents firstName lastName grade school");

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
    });

    await childrenModel.updateMany(
      { teacher: teacher },
      { $push: { assignment: newAssignment._id } }
    );
    // Get all unique parent emails and daycare emails
    const parentEmails = [];
    const daycareEmails = [];

    childrens.forEach((child) => {
      if (
        child.parents &&
        typeof child.parents === "object" &&
        child.parents !== null
      ) {
        const parentEmail = (child.parents as any)?.email;
        if (
          parentEmail &&
          typeof parentEmail === "string" &&
          !parentEmails.includes(parentEmail)
        ) {
          parentEmails.push(parentEmail);
        }

        const daycareEmail = (child.parents as any)?.daycareEmail;
        if (
          daycareEmail &&
          typeof daycareEmail === "string" &&
          !daycareEmails.includes(daycareEmail)
        ) {
          daycareEmails.push(daycareEmail);
        }
      }
    });
    // Send notifications to all parents and daycares (only once per assignment)
    if (parentEmails.length > 0 || daycareEmails.length > 0) {
      // Create a summary of all lessons for the notification
      const lessonSummary = newAssignment.lessons.map((lesson) => ({
        lessonName: lesson.lessonName,
        taskDescription: lesson.taskDescription,
      }));

      sendHomeworkAddedNotification(
        childrens
          .filter(
            (c) =>
              c.parents && typeof c.parents === "object" && c.parents !== null
          )
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
        lessonSummary, // Send lesson summary instead of individual lessons
        newAssignment
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
