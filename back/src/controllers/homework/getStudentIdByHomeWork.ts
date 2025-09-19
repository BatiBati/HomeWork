import { homeworkModel } from "../../models/homework.models";

export const getStudentIdByHomeWork = async (req, res) => {
  try {
    const { studentId } = req.params;

    const homeworks = await homeworkModel
      .find({ studentId })
      .populate("taskId")
      .lean();

    res.json(homeworks);
  } catch (error) {
    console.error("Homework fetch error:", error);
    res.status(500).json({ message: "Homework fetch error" });
  }
};
