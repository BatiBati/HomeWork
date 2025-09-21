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
exports.loginTeacher = void 0;
const teacher_model_1 = require("../../models/teacher.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }
    try {
        const teacher = yield teacher_model_1.teacherModel
            .findOne({
            email: email.trim().toLowerCase(),
        })
            .populate("students")
            .populate("tasks");
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, teacher.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid password or email" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: teacher._id.toString(), email: teacher.email }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
        res.status(200).json({
            message: "Logged in successfully",
            token,
            teacher: {
                _id: teacher._id,
                teacherName: teacher.teacherName,
                email: teacher.email,
                school: teacher.school,
                grade: teacher.grade,
                students: teacher.students,
                tasks: teacher.tasks,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginTeacher = loginTeacher;
//# sourceMappingURL=login-teacher.js.map