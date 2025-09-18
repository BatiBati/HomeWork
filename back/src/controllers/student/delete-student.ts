import { RequestHandler } from "express";
import { studentModel } from "../../models/student.model";
import { teacherModel } from "../../models/teacher.model";

export const deleteStudentController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const existingStudent = await studentModel.findById(id);
    if (!existingStudent) {
      res.status(404).json({ message: "Сурагч олдсонгүй" });
      return;
    }

    // Remove student from teacher's students array
    await teacherModel.findByIdAndUpdate(existingStudent.teacherId, {
      $pull: { students: existingStudent._id },
      updatedAt: new Date(),
    });

    // Delete the student
    await studentModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Сурагч амжилттай устгагдлаа",
      deletedStudent: {
        _id: existingStudent._id,
        parentname: existingStudent.parentname,
        childname: existingStudent.childname,
        parentEmail: existingStudent.parentEmail,
      },
    });
  } catch (error) {
    console.error("Сурагч устгах алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};
