"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRouter = void 0;
const express_1 = require("express");
const create_teacher_1 = require("../controllers/teacher/create-teacher");
const login_teacher_1 = require("../controllers/teacher/login-teacher");
const auth_techer_middlware_1 = require("../middleware/auth.techer.middlware");
const getMe_teacher_1 = require("../controllers/teacher/getMe-teacher");
const router = (0, express_1.Router)();
exports.teacherRouter = router;
router.post("/create", create_teacher_1.createTeacher);
router.post("/login", login_teacher_1.loginTeacher);
router.get("/getme", auth_techer_middlware_1.authMiddleware, getMe_teacher_1.getMe);
//# sourceMappingURL=teacher.route.js.map