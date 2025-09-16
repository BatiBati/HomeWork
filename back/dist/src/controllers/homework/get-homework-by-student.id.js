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
exports.getHomeworkByStudentIdController = void 0;
const homework_models_1 = require("../../models/homework.models");
const student_model_1 = require("../../models/student.model");
const getHomeworkByStudentIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    try {
        // Validate that the student exists
        const student = yield student_model_1.studentModel.findById(studentId);
        if (!student) {
            res.status(404).json({
                message: "Student not found"
            });
            return;
        }
        // Get all homeworks for the specific student
        const homeworks = yield homework_models_1.homeworkModel
            .find({ studentId })
            .populate("studentId", "username childname")
            .populate("taskId")
            .sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json({
            message: "Student homeworks fetched successfully",
            student: {
                _id: student._id,
                parentname: student.parentname,
                childname: student.childname
            },
            homeworks,
            count: homeworks.length
        });
    }
    catch (error) {
        console.error("Error fetching student homeworks:", error);
        res.status(500).json({
            error: "Server error",
            message: "Failed to fetch student homeworks"
        });
    }
});
exports.getHomeworkByStudentIdController = getHomeworkByStudentIdController;
//# sourceMappingURL=get-homework-by-student.id.js.map