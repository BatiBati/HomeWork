import { Request, Response } from "express";
import { teacherModel } from "../../models/teacher.model";

export const updateTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTeacher = await teacherModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeacher) {
      res.status(404).json({ message: "Teacher олдсонгүй" });
      return;
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error("❌ Update teacher error:", error);
    res.status(500).json({ message: "Teacher шинэчлэхэд алдаа гарлаа" });
  }
};
