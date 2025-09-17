// controllers/studentController.ts
import { RequestHandler } from "express";
import { studentModel } from "../../models/student.model";

// GET /student/:id
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentModel
      .findById(id)
      .populate("homeworks") // Homework-уудыг populate хийх
      .populate("teacherId"); // Teacher-ийн мэдээллийг populate хийх

    if (!student) {
      return res.status(404).json({ message: "Сурагч олдсонгүй" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student by id:", error);
    res.status(500).json({ message: "Server error" });
  }
};
