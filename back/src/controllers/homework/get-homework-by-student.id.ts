import { RequestHandler } from "express";
import { homeworkModel } from "../../models/homework.models";
import { studentModel } from "../../models/student.model";

export const getHomeworkByStudentIdController: RequestHandler = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Validate that the student exists
    const student = await studentModel.findById(studentId);
    if (!student) {
      res.status(404).json({ 
        message: "Student not found" 
      });
      return;
    }

    // Get all homeworks for the specific student
    const homeworks = await homeworkModel
      .find({ studentId })
      .populate("studentId", "username childname")
      .populate("taskId")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({ 
      message: "Student homeworks fetched successfully", 
      student: {
        _id: student._id,
parentname: student.parentname,
        childname: student.childname
      },
      homeworks,
      count: homeworks.length
    });
  } catch (error) {
    console.error("Error fetching student homeworks:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: "Failed to fetch student homeworks" 
    });
  }
};

