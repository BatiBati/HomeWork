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
const user_model_1 = require("../../models/user.model");
const loginOrRegisterStudentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { parentname, childname, teacherId, parentEmail } = req.body;
    if (!parentname || !childname || !teacherId) {
        res.status(400).json({
            message: "Parent name, child name, and teacher ID are required",
        });
        return;
    }
    try {
        let teacher = yield teacher_model_1.teacherModel.findById(teacherId);
        if (!teacher) {
            const user = yield user_model_1.userModel.findById(teacherId);
            if (user) {
                const existingTeacherByEmail = yield teacher_model_1.teacherModel.findOne({
                    email: user.email.trim().toLowerCase(),
                });
                if (existingTeacherByEmail) {
                    teacher = existingTeacherByEmail;
                }
                else {
                    teacher = yield teacher_model_1.teacherModel.create({
                        teacherName: `${user.firstName} ${user.lastName}`.trim(),
                        email: user.email.trim().toLowerCase(),
                        password: user.password,
                        school: ((_a = user.school) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                        grade: ((_b = user.grade) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                }
            }
        }
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        let student = yield student_model_1.studentModel.findOne({
            parentname,
            childname,
            teacherId: teacher._id,
        });
        if (!student) {
            student = yield student_model_1.studentModel.create({
                parentname,
                childname,
                teacherId: teacher._id,
                parentEmail,
                homeworks: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            yield teacher_model_1.teacherModel.findByIdAndUpdate(teacher._id, {
                $addToSet: { students: student._id },
                updatedAt: new Date(),
            });
        }
        yield student.populate("homeworks");
        const token = jsonwebtoken_1.default.sign({
            _id: student._id.toString(),
            parentname: student.parentname,
            childname: student.childname,
            parentEmail: student.parentEmail,
        }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
        res.status(200).json({
            message: student.createdAt.getTime() === student.updatedAt.getTime()
                ? "Registered & logged in"
                : "Logged in",
            token,
            student: {
                _id: student._id,
                parentname: student.parentname,
                childname: student.childname,
                parentEmail: student.parentEmail,
                homeworks: student.homeworks,
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