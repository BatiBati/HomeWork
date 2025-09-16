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
exports.getMe = void 0;
const teacher_model_1 = require("../../models/teacher.model");
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const teacherId = (_a = req.teacher) === null || _a === void 0 ? void 0 : _a._id;
        if (!teacherId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const teacher = yield teacher_model_1.teacherModel
            .findById(teacherId)
            .populate("tasks")
            .populate("students");
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        res.status(200).json({ teacher });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.getMe = getMe;
//# sourceMappingURL=getMe-teacher.js.map