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
exports.optionalAuth = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const student_model_1 = require("../models/student.model");
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
        if (!token) {
            res.status(401).json({ message: "Access token required" });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
        // ✅ Match payload from controller
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Check if student exists
        const student = yield student_model_1.studentModel.findById(decoded._id);
        if (!student) {
            res.status(401).json({ message: "Invalid token - student not found" });
            return;
        }
        // Attach to req
        req.student = {
            _id: student._id.toString(),
            parentname: student.parentname,
            childname: student.childname,
        };
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        res.status(403).json({ message: "Invalid or expired token" });
    }
});
exports.authenticateToken = authenticateToken;
// ✅ Optional auth: if token exists, attach student; otherwise continue
const optionalAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (token) {
            const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const student = yield student_model_1.studentModel.findById(decoded._id);
            if (student) {
                req.student = {
                    _id: student._id.toString(),
                    parentname: student.parentname,
                    childname: student.childname,
                };
            }
        }
        next();
    }
    catch (error) {
        next();
    }
});
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.stud.middleware.js.map