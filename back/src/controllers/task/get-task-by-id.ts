import { RequestHandler } from "express";
import { taskModel } from "../../models/task.model";

export const getTaskById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.findById(id).populate({
      path: "homeworks",
      populate: {
        path: "studentId",
        model: "Student",
      },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
