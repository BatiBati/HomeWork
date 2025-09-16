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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterStudentController = void 0;
const student_model_1 = require("../../models/student.model");
const teacher_model_1 = require("../../models/teacher.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginOrRegisterStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parentname, childname, teacherId } = req.body;
    if (!parentname || !childname || !teacherId) {
        res
            .status(400)
            .json({
            message: "Parent name, child name, and teacher ID are required",
        });
        return;
    }
    try {
        // 1. Check if teacher exists
        const teacher = yield teacher_model_1.teacherModel.findById(teacherId);
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        // 2. Check if student already exists
        let student = yield student_model_1.studentModel.findOne({ parentname, childname });
        // 3. Create new student if not exists
        if (!student) {
            student = yield student_model_1.studentModel.create({
                parentname,
                childname,
                teacherId,
                homeworks: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            // Add student to teacher
            yield teacher_model_1.teacherModel.findByIdAndUpdate(teacherId, {
                $addToSet: { students: student._id },
                updatedAt: new Date(),
            });
        }
        // 4. Create JWT token with student info
        const token = jsonwebtoken_1.default.sign({
            _id: student._id.toString(),
            parentname: student.parentname,
            childname: student.childname,
        }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
        // 5. Return token + student
        res.status(200).json({
            message: student.createdAt === student.updatedAt
                ? "Registered & logged in"
                : "Logged in",
            token,
            student: {
                _id: student._id,
                parentname: student.parentname,
                childname: student.childname,
            },
        });
    }
    catch (error) {
        console.error("Login/Register error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginOrRegisterStudentController = loginOrRegisterStudentController;
//# sourceMappingURL=create-student.js.map