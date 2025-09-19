import { Request, Response } from "express";
import { taskModel } from "../../models/task.model";
import { teacherModel } from "../../models/teacher.model";
import { studentModel } from "../../models/student.model";
import { sendHomeworkAddedNotification } from "../../utils/mail-handler";

export const createTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { teacherId, lessonName, image, homeWork, taskEndSchedule } = req.body;

  if (!teacherId || !lessonName || !taskEndSchedule) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const task = await taskModel.create({
      lessonName,
      image,
      homeWork,
      taskEndSchedule,
      teacherId,
    });

    const teacher = await teacherModel.findByIdAndUpdate(
      teacherId,
      { $push: { tasks: task._id } },
      { new: true }
    );
    // Send email notifications to all students' parents
    try {
      const students = await studentModel
        .find({ teacherId })
        .select("parentEmail parentname childname");

      const emailPromises = students
        .filter((student) => student.parentEmail) // Only send to students with email
        .map(async (student) => {
          try {
            await sendHomeworkAddedNotification(
              student.parentEmail,
              `${lessonName} даалгавар нэмэгдлээ`,

              student._id.toString(),
              lessonName,

              taskEndSchedule
            );
            console.log(
              `✅ Email sent to ${student.parentname} (${student.childname})`
            );
          } catch (emailError) {
            console.error(
              `❌ Failed to send email to ${student.parentname}:`,
              emailError
            );
          }
        });

      await Promise.allSettled(emailPromises);
      console.log(
        `📧 Email notifications sent to ${
          students.filter((s) => s.parentEmail).length
        } parents`
      );
    } catch (emailError) {
      console.error("Email notification error:", emailError);
      // Don't fail the task creation if email fails
    }

    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.status(200).json({
      message: "Task created and added to teacher",
      task,
      teacherId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Task create error" });
  }
};
