import { RequestHandler } from "express";
import { homeworkModel } from "../../models/homework.models";
import mongoose from "mongoose";

// PUT /homework/:id
export const updateHomeworkById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid homework ID" });
    return;
  }

  try {
    const homework = await homeworkModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!homework) {
      res.status(404).json({ message: "Homework not found" });
      return;
    }

    // populate separately
    const populatedHomework = await homework.populate("studentId");

    res.json({ message: "Homework updated", homework: populatedHomework });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
