// controllers/studentController.ts
import { RequestHandler } from "express";
import { studentModel } from "../../models/student.model";

// GET /student/:childname
export const getStudentByChildname = async (req, res) => {
  try {
    const { childname } = req.params;

    // Хүүхдийн нэрээр хайх (case-insensitive)
    const student = await studentModel
      .findOne({ childname: { $regex: new RegExp(`^${childname}$`, "i") } })
      .populate("homeworks") // Homework-уудыг populate хийх бол
      .populate("teacherId"); // Teacher-ийн мэдээллийг populate хийх бол

    if (!student) {
      return res.status(404).json({ message: "Сурагч олдсонгүй" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student by childname:", error);
    res.status(500).json({ message: "Server error" });
  }
};
