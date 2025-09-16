import { RequestHandler } from "express";
import { homeworkModel } from "../../models/homework.models";

export const getHomeworksController: RequestHandler = async (req, res) => {
  try {
    const homeworks = await homeworkModel
      .find()
      .populate("studentId", "username childname")
      .populate("taskId")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({ 
      message: "Homeworks fetched successfully", 
      homeworks,
      count: homeworks.length
    });
  } catch (error) {
    console.error("Error fetching homeworks:", error);
    res.status(500).json({ 
      error: "Server error", 
      message: "Failed to fetch homeworks" 
    });
  }
};

