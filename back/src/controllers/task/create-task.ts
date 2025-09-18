import { Request, Response } from "express";
import { taskModel } from "../../models/task.model";
import { teacherModel } from "../../models/teacher.model";

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
    });

    const teacher = await teacherModel.findByIdAndUpdate(
      teacherId,
      { $push: { tasks: task._id } },
      { new: true }
    );

    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    res.status(200).json({
      message: "Task created and added to teacher",
      task,
      teacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: "Task create error" });
  }
};
