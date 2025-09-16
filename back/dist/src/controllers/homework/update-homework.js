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
exports.updateHomeworkController = void 0;
const homework_models_1 = require("../../models/homework.models");
const updateHomeworkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, taskId } = req.body;
    try {
        // Find the homework by ID
        const homework = yield homework_models_1.homeworkModel.findById(id);
        if (!homework) {
            res.status(404).json({
                message: "Homework not found"
            });
            return;
        }
        const updatedHomework = yield homework_models_1.homeworkModel.findByIdAndUpdate(id, Object.assign(Object.assign(Object.assign({}, (description && { description })), (taskId && { taskId })), { updatedAt: new Date() }), { new: true }).populate("studentId", "username childname").populate("taskId");
        res.status(200).json({
            message: "Homework updated successfully",
            homework: updatedHomework
        });
    }
    catch (error) {
        console.error("Error updating homework:", error);
        res.status(500).json({
            error: "Server error",
            message: "Failed to update homework"
        });
    }
});
exports.updateHomeworkController = updateHomeworkController;
//# sourceMappingURL=update-homework.js.map