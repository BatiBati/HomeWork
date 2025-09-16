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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugTeacher = exports.loginTeacher = exports.createTeacher = void 0;
const teacher_model_1 = require("../../models/teacher.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherName, email, password, school, grade } = req.body;
    if (!teacherName || !email || !password || !school || !grade) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        // Check if teacher already exists
        const existingTeacher = yield teacher_model_1.teacherModel.findOne({
            email: email.trim().toLowerCase(),
        });
        if (existingTeacher) {
            res
                .status(409)
                .json({ message: "Teacher with this email already exists" });
            return;
        }
        // Hash the password WITHOUT trimming (trimming can cause issues)
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const teacher = yield teacher_model_1.teacherModel.create({
            teacherName: teacherName.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            school: school.trim(),
            grade: grade.trim(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // Don't send password back in response
        const _a = teacher.toObject(), { password: _ } = _a, teacherResponse = __rest(_a, ["password"]);
        res.status(201).json({
            message: "Teacher created successfully",
            teacher: teacherResponse,
        });
    }
    catch (error) {
        console.error("Create teacher error:", error);
        // Handle duplicate key error (if email has unique constraint)
        if (error.code === 11000) {
            res
                .status(409)
                .json({ message: "Teacher with this email already exists" });
            return;
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.createTeacher = createTeacher;
const loginTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }
    try {
        console.log("Login attempt for email:", email.trim().toLowerCase());
        const teacher = yield teacher_model_1.teacherModel.findOne({
            email: email.trim().toLowerCase(),
        });
        if (!teacher) {
            console.log("Teacher not found in database");
            res.status(401).json({ message: "Invalid email or password" }); // Don't reveal which field is wrong
            return;
        }
        console.log("Teacher found, comparing passwords...");
        console.log("Input password length:", password.length);
        console.log("Stored hash length:", teacher.password.length);
        // Compare password WITHOUT trimming the input password
        const isMatch = yield bcrypt_1.default.compare(password, teacher.password);
        console.log("Password match result:", isMatch);
        if (!isMatch) {
            console.log("Password comparison failed");
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET not configured");
            res.status(500).json({ message: "Server configuration error" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            _id: teacher._id.toString(),
            email: teacher.email,
            teacherName: teacher.teacherName,
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
        console.log("Login successful for teacher:", teacher.email);
        res.status(200).json({
            message: "Logged in successfully",
            token,
            teacher: {
                _id: teacher._id,
                teacherName: teacher.teacherName,
                email: teacher.email,
                school: teacher.school,
                grade: teacher.grade,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", details: err.message });
    }
});
exports.loginTeacher = loginTeacher;
// Helper function for debugging (remove in production)
const debugTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const teacher = yield teacher_model_1.teacherModel.findOne({
            email: email.trim().toLowerCase(),
        });
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        res.json({
            email: teacher.email,
            passwordHash: teacher.password,
            passwordHashLength: teacher.password.length,
            createdAt: teacher.createdAt,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.debugTeacher = debugTeacher;
//# sourceMappingURL=create-teacher.js.map