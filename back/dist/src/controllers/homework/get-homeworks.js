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
exports.getHomeworksController = void 0;
const homework_models_1 = require("../../models/homework.models");
const getHomeworksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const homeworks = yield homework_models_1.homeworkModel
            .find()
            .populate("studentId", "username childname")
            .populate("taskId")
            .sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json({
            message: "Homeworks fetched successfully",
            homeworks,
            count: homeworks.length
        });
    }
    catch (error) {
        console.error("Error fetching homeworks:", error);
        res.status(500).json({
            error: "Server error",
            message: "Failed to fetch homeworks"
        });
    }
});
exports.getHomeworksController = getHomeworksController;
//# sourceMappingURL=get-homeworks.js.map