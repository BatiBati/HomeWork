import { RequestHandler } from "express";
import { homeworkModel } from "../../models/homework.models";

export const updateHomeworkController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { description, taskId } = req.body;

  try {
    // Find the homework by ID
    const homework = await homeworkModel.findById(id);
    if (!homework) {
      res.status(404).json({ 
        message: "Homework not found" 
      });
      return;
    }

    // Update the homework
    const updatedHomework = await homeworkModel.findByIdAndUpdate(
      id,
      {
        ...(description && { description }),
        ...(taskId && { taskId }),
        updatedAt: new Date(),
      },
      { new: true }
    ).populate("studentId", "username childname").populate("taskId");

    res.status(200).json({ 
      message: "Homework updated successfully", 
      homework: updatedHomework 
    });
  } catch (error) {
    console.error("Error updating homework:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: "Failed to update homework" 
    });
  }
};

