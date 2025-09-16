import { RequestHandler } from "express";
import { homeworkModel } from "../../models/homework.models";
import { studentModel } from "../../models/student.model";
import { Request, Response, NextFunction } from "express";

export const createHomeworkController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { taskId, description } = req.body;

  try {
    if (!req.student) {
      res.status(401).json({ message: "Authentication required" });
    }

    if (!taskId || !description) {
    res.status(400).json({ message: "taskId and description are required" });
    }

    const studentId = req.student._id;

    const homework = await homeworkModel.create({
      taskId,
      studentId,
      description,
    });

    await studentModel.findByIdAndUpdate(
      studentId,
      {
        $addToSet: { homeworks: homework._id },
        updatedAt: new Date(),
      }
    );

    const updatedStudent = await studentModel.findById(studentId).select("username childname");

    res.status(201).json({
      message: "Homework created successfully",
      homework,
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error processing homework:", error);
    res.status(500).json({
      error: "Server error",
      message: "Failed to process homework",
    });
  }
};
