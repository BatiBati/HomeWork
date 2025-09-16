import { RequestHandler } from "express";
import { homeworkModel } from "../../models/homework.models";
import { studentModel } from "../../models/student.model";

export const deleteHomeworkController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the homework by ID
    const homework = await homeworkModel.findById(id);
    if (!homework) {
      res.status(404).json({ 
        message: "Homework not found" 
      });
      return;
    }

    await studentModel.findByIdAndUpdate(
      homework.studentId,
      { 
        $pull: { homeworks: id },
        updatedAt: new Date()
      }
    );

    // Delete the homework
    await homeworkModel.findByIdAndDelete(id);

    res.status(200).json({ 
      message: "Homework deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting homework:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: "Failed to delete homework" 
    });
  }
};

