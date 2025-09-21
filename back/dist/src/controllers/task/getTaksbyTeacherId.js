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
exports.getTasksByTeacher = void 0;
const task_model_1 = require("../../models/task.model");
const getTasksByTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teacherId } = req.params;
        const tasks = yield task_model_1.taskModel.find({ teacherId }).populate("homeworks"); // тухайн даалгаварт оруулсан бүх homeworks
        if (!tasks || tasks.length === 0) {
            return res
                .status(404)
                .json({ message: "Энэ багш даалгавар оруулаагүй байна" });
        }
        res.json(tasks);
    }
    catch (error) {
        console.error("Error fetching teacher tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getTasksByTeacher = getTasksByTeacher;
//# sourceMappingURL=getTaksbyTeacherId.js.map