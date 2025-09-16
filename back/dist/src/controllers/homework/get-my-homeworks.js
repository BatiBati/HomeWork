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
exports.getMyHomeworksController = void 0;
const student_model_1 = require("../../models/student.model");
const getMyHomeworksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.student) {
            res.status(401).json({
                message: "Authentication required"
            });
            return;
        }
        const studentId = req.student._id;
        const student = yield student_model_1.studentModel
            .findById(studentId)
            .populate({
            path: "homeworks",
            populate: {
                path: "taskId"
            }
        })
            .select("-password");
        if (!student) {
            res.status(404).json({
                message: "Student not found"
            });
            return;
        }
        const homeworks = student.homeworks || [];
        res.status(200).json({
            message: "My homeworks fetched successfully",
            student: {
                _id: req.student._id,
                parentname: req.student.parentname,
                childname: req.student.childname
            },
            homeworks,
            count: homeworks.length
        });
    }
    catch (error) {
        console.error("Error fetching my homeworks:", error);
        res.status(500).json({
            error: "Server error",
            message: "Failed to fetch my homeworks"
        });
    }
});
exports.getMyHomeworksController = getMyHomeworksController;
//# sourceMappingURL=get-my-homeworks.js.map