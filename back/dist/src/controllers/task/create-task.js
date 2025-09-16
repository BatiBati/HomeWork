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
exports.createTaskController = void 0;
const task_model_1 = require("../../models/task.model");
const teacher_model_1 = require("../../models/teacher.model");
const createTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId, lessonName, image, homeWork, taskEndSchedule } = req.body;
    if (!teacherId || !lessonName || !taskEndSchedule) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const task = yield task_model_1.taskModel.create({
            lessonName,
            image,
            homeWork,
            taskEndSchedule,
        });
        const teacher = yield teacher_model_1.teacherModel.findByIdAndUpdate(teacherId, { $push: { tasks: task._id } }, { new: true });
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        res.status(200).json({
            message: "Task created and added to teacher",
            task,
            teacher,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error, message: "Task create error" });
    }
});
exports.createTaskController = createTaskController;
//# sourceMappingURL=create-task.js.map