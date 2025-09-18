// controllers/homeworkController.ts

import { homeworkModel } from "../../models/homework.models";
import { studentModel } from "../../models/student.model";
import { taskModel } from "../../models/task.model";
import { teacherModel } from "../../models/teacher.model";

export const submitHomework = async (req, res) => {
  try {
    const { studentId, taskId, description, image } = req.body;

    // 1. Homework үүсгэнэ
    const homework = await homeworkModel.create({
      studentId,
      taskId,
      description,
      image,
    });

    // 2. Сурагчийн homeworks-д нэмнэ
    await studentModel.findByIdAndUpdate(studentId, {
      $push: { homeworks: homework._id },
    });

    // 3. Task.homeworks-д нэмнэ
    const task = await taskModel
      .findByIdAndUpdate(
        taskId,
        { $push: { homeworks: homework._id } },
        { new: true }
      )
      .populate({
        path: "homeworks",
        populate: { path: "studentId", select: "childname parentname" },
      });

    if (!task) {
      return res.status(404).json({ message: "Task олдсонгүй" });
    }

    // 4. Багшийн tasks баталгаажуулна
    await teacherModel.findByIdAndUpdate(task.teacherId, {
      $addToSet: { tasks: task._id },
    });

    res.status(201).json({
      message: "Даалгавар амжилттай илгээгдлээ",
      homework,
      task,
    });
  } catch (error) {
    console.error("Error submitting homework:", error);
    res.status(500).json({ message: "Server error" });
  }
};
