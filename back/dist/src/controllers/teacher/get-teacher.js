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
exports.getTeacherById = void 0;
const teacher_model_1 = require("../../models/teacher.model");
const getTeacherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = (yield teacher_model_1.teacherModel.findById(req.params.id))
            .populated("students")
            .populate("tasks");
        if (!teacher) {
            res.status(404).json({
                message: "Teacher not found",
            });
            return;
        }
        res.status(200).json({
            message: "Teacher fetched successfully",
            teacher,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Get Teacher by id server error",
            error,
        });
    }
});
exports.getTeacherById = getTeacherById;
//# sourceMappingURL=get-teacher.js.map