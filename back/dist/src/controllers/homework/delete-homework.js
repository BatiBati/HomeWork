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
exports.deleteHomeworkController = void 0;
const homework_models_1 = require("../../models/homework.models");
const student_model_1 = require("../../models/student.model");
const deleteHomeworkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Find the homework by ID
        const homework = yield homework_models_1.homeworkModel.findById(id);
        if (!homework) {
            res.status(404).json({
                message: "Homework not found"
            });
            return;
        }
        yield student_model_1.studentModel.findByIdAndUpdate(homework.studentId, {
            $pull: { homeworks: id },
            updatedAt: new Date()
        });
        // Delete the homework
        yield homework_models_1.homeworkModel.findByIdAndDelete(id);
        res.status(200).json({
            message: "Homework deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting homework:", error);
        res.status(500).json({
            error: "Server error",
            message: "Failed to delete homework"
        });
    }
});
exports.deleteHomeworkController = deleteHomeworkController;
//# sourceMappingURL=delete-homework.js.map