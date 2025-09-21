"use strict";
// controllers/homeworkController.ts
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
exports.submitHomework = void 0;
const homework_models_1 = require("../../models/homework.models");
const student_model_1 = require("../../models/student.model");
const task_model_1 = require("../../models/task.model");
const teacher_model_1 = require("../../models/teacher.model");
const submitHomework = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, taskId, description, image } = req.body;
        // 1. Homework үүсгэнэ
        const homework = yield homework_models_1.homeworkModel.create({
            studentId,
            taskId,
            description,
            image,
        });
        // 2. Сурагчийн homeworks-д нэмнэ
        yield student_model_1.studentModel.findByIdAndUpdate(studentId, {
            $push: { homeworks: homework._id },
        });
        // 3. Task.homeworks-д нэмнэ
        const task = yield task_model_1.taskModel
            .findByIdAndUpdate(taskId, { $push: { homeworks: homework._id } }, { new: true })
            .populate({
            path: "homeworks",
            populate: { path: "studentId", select: "childname parentname" },
        });
        if (!task) {
            return res.status(404).json({ message: "Task олдсонгүй" });
        }
        // 4. Багшийн tasks баталгаажуулна
        yield teacher_model_1.teacherModel.findByIdAndUpdate(task.teacherId, {
            $addToSet: { tasks: task._id },
        });
        res.status(201).json({
            message: "Даалгавар амжилттай илгээгдлээ",
            homework,
            task,
        });
    }
    catch (error) {
        console.error("Error submitting homework:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.submitHomework = submitHomework;
//# sourceMappingURL=create-homework.js.map