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
exports.deleteStudentController = void 0;
const student_model_1 = require("../../models/student.model");
const teacher_model_1 = require("../../models/teacher.model");
const deleteStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if student exists
        const existingStudent = yield student_model_1.studentModel.findById(id);
        if (!existingStudent) {
            res.status(404).json({ message: "Сурагч олдсонгүй" });
            return;
        }
        // Remove student from teacher's students array
        yield teacher_model_1.teacherModel.findByIdAndUpdate(existingStudent.teacherId, {
            $pull: { students: existingStudent._id },
            updatedAt: new Date(),
        });
        // Delete the student
        yield student_model_1.studentModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Сурагч амжилттай устгагдлаа",
            deletedStudent: {
                _id: existingStudent._id,
                parentname: existingStudent.parentname,
                childname: existingStudent.childname,
                parentEmail: existingStudent.parentEmail,
            },
        });
    }
    catch (error) {
        console.error("Сурагч устгах алдаа:", error);
        res.status(500).json({ message: "Серверийн алдаа" });
    }
});
exports.deleteStudentController = deleteStudentController;
//# sourceMappingURL=delete-student.js.map