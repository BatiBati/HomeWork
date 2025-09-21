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
exports.refreshTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const student_model_1 = require("../../models/student.model");
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Access token required",
            });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Find the student to ensure they still exist
        const student = yield student_model_1.studentModel.findById(decoded.studentId);
        if (!student) {
            res.status(401).json({
                message: "Invalid token - student not found",
            });
            return;
        }
        // Generate new token
        const newToken = jsonwebtoken_1.default.sign({
            studentId: student._id,
            parentname: student.parentname,
            parentEmail: student.parentEmail,
        }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            message: "Token refreshed successfully",
            token: newToken,
        });
    }
    catch (error) {
        console.error("Token refresh error:", error);
        res.status(403).json({
            message: "Invalid or expired token",
        });
    }
});
exports.refreshTokenController = refreshTokenController;
//# sourceMappingURL=refresh-token.js.map