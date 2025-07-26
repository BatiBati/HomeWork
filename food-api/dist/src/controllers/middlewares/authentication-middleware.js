"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "Unauthenticated" });
        return;
    }
    try {
        const { userId, isAdmin } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = userId;
        req.isAdmin = isAdmin;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Invalid token" });
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
//# sourceMappingURL=authentication-middleware.js.map