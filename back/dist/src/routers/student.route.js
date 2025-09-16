"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const student_1 = require("../controllers/student");
const router = (0, express_1.Router)();
exports.studentRouter = router;
// Public routes (no authentication required)
router.post("/login", student_1.loginOrRegisterStudentController);
router.post("/refresh-token", student_1.refreshTokenController);
router.post("/logout", student_1.logoutStudentController);
//# sourceMappingURL=student.route.js.map