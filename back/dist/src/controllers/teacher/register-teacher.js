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
exports.registerTeacherController = void 0;
const teacher_model_1 = require("../../models/teacher.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerTeacherController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherName, password, school, grade } = req.body;
    try {
        // Input validation
        if (!teacherName || !password || !school || !grade) {
            res.status(400).json({
                message: "Teacher name, password, school, and grade are required"
            });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
            return;
        }
        // Create new teacher (password will be automatically hashed by pre-save middleware)
        const teacher = yield teacher_model_1.teacherModel.create({
            teacherName,
            password,
            school,
            grade,
            students: [],
            homeworks: [],
            updatedAt: new Date(),
            createdAt: new Date(),
        });
        // Generate JWT token for immediate login after signup
        const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
        const token = jsonwebtoken_1.default.sign({
            teacherId: teacher._id,
            teacherName: teacher.teacherName
        }, JWT_SECRET, { expiresIn: "7d" });
        // Remove password from response for security
        const teacherResponse = {
            _id: teacher._id,
            teacherName: teacher.teacherName,
            school: teacher.school,
            grade: teacher.grade,
            students: teacher.students,
            homeworks: teacher.homeworks,
            createdAt: teacher.createdAt,
            updatedAt: teacher.updatedAt,
        };
        res.status(201).json({
            message: "Teacher registered successfully",
            teacher: teacherResponse,
            token: token
        });
    }
    catch (error) {
        console.error("Error creating teacher:", error);
        res.status(500).json({
            error: "Server error",
            message: "Failed to create teacher"
        });
    }
});
exports.registerTeacherController = registerTeacherController;
//# sourceMappingURL=register-teacher.js.map