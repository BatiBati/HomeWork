import { RequestHandler } from "express";
import { studentModel } from "../../models/student.model";

export const getMyHomeworksController: RequestHandler = async (req, res) => {
  try {
    if (!req.student) {
      res.status(401).json({ 
        message: "Authentication required" 
      });
      return;
    }

    const studentId = req.student._id;

    const student = await studentModel
      .findById(studentId)
      .populate({
        path: "homeworks",
        populate: {
          path: "taskId"
        }
      })
      .select("-password");

    if (!student) {
      res.status(404).json({ 
        message: "Student not found" 
      });
      return;
    }

    const homeworks = student.homeworks || [];

    res.status(200).json({ 
      message: "My homeworks fetched successfully", 
      student: {
        _id: req.student._id,
        parentname: req.student.parentname,
        childname: req.student.childname
      },
      homeworks,
      count: homeworks.length
    });
  } catch (error) {
    console.error("Error fetching my homeworks:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: "Failed to fetch my homeworks" 
    });
  }
};
