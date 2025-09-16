import { RequestHandler } from "express";
import { taskModel } from "../../models/task.model";
import { formatInTimeZone } from "date-fns-tz";

const mongoliaTimeZone = "Asia/Ulaanbaatar";

export const createTaskController: RequestHandler = async (req, res) => {
  const { lessonName, image, homeWork, taskEndSchedule } = req.body;

  try {
    const task = await taskModel.create({
      lessonName,
      image,
      homeWork,
      taskEndSchedule,
    });

    res.status(200).json({
      message: "Task created",
      task: {
        ...task.toObject(),
        createdAt: formatInTimeZone(
          task.createdAt,
          mongoliaTimeZone,
          "yyyy-MM-dd HH:mm:ss"
        ),
        updatedAt: formatInTimeZone(
          task.updatedAt,
          mongoliaTimeZone,
          "yyyy-MM-dd HH:mm:ss"
        ),
      },
    });
  } catch (error) {
    res.status(500).json({ error, message: "Task create error" });
  }
};
