import { RequestHandler } from "express";
import { studentModel } from "../../models/student.model";

export const updateStudentController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { parentname, childname, parentEmail } = req.body;

    // Check if student exists
    const existingStudent = await studentModel.findById(id);
    if (!existingStudent) {
      res.status(404).json({ message: "Сурагч олдсонгүй" });
      return;
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date(),
    };

    // Only update fields that are provided
    if (parentname !== undefined) {
      updateData.parentname = parentname;
    }
    if (childname !== undefined) {
      updateData.childname = childname;
    }
    if (parentEmail !== undefined) {
      updateData.parentEmail = parentEmail;
    }

    // Update student
    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Сурагчийн мэдээлэл амжилттай шинэчлэгдлээ",
      student: {
        _id: updatedStudent._id,
        parentname: updatedStudent.parentname,
        childname: updatedStudent.childname,
        parentEmail: updatedStudent.parentEmail,
        teacherId: updatedStudent.teacherId,
        homeworks: updatedStudent.homeworks,
        createdAt: updatedStudent.createdAt,
        updatedAt: updatedStudent.updatedAt,
      },
    });
  } catch (error) {
    console.error("Сурагч шинэчлэх алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};
