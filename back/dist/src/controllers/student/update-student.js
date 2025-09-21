"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentController = void 0;
const student_model_1 = require("../../models/student.model");
const updateStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { parentname, childname, parentEmail } = req.body;
        // Check if student exists
        const existingStudent = yield student_model_1.studentModel.findById(id);
        if (!existingStudent) {
            res.status(404).json({ message: "Сурагч олдсонгүй" });
            return;
        }
        // Prepare update data
        const updateData = {
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
        const updatedStudent = yield student_model_1.studentModel.findByIdAndUpdate(id, updateData, { new: true });
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
    }
    catch (error) {
        console.error("Сурагч шинэчлэх алдаа:", error);
        res.status(500).json({ message: "Серверийн алдаа" });
    }
});
exports.updateStudentController = updateStudentController;
//# sourceMappingURL=update-student.js.map