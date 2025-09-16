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
exports.createHomeworkController = void 0;
const homework_models_1 = require("../../models/homework.models");
const student_model_1 = require("../../models/student.model");
const createHomeworkController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId, description } = req.body;
    try {
        if (!req.student) {
            res.status(401).json({ message: "Authentication required" });
        }
        if (!taskId || !description) {
            res.status(400).json({ message: "taskId and description are required" });
        }
        const studentId = req.student._id;
        const homework = yield homework_models_1.homeworkModel.create({
            taskId,
            studentId,
            description,
        });
        yield student_model_1.studentModel.findByIdAndUpdate(studentId, {
            $addToSet: { homeworks: homework._id },
            updatedAt: new Date(),
        });
        const updatedStudent = yield student_model_1.studentModel.findById(studentId).select("username childname");
        res.status(201).json({
            message: "Homework created successfully",
            homework,
            student: updatedStudent,
        });
    }
    catch (error) {
        console.error("Error processing homework:", error);
        res.status(500).json({
            error: "Server error",
            message: "Failed to process homework",
        });
    }
});
exports.createHomeworkController = createHomeworkController;
//# sourceMappingURL=create-homework.js.map