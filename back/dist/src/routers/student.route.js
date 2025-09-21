"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const student_1 = require("../controllers/student");
const router = (0, express_1.Router)();
exports.studentRouter = router;
// Public routes (no authentication required)
router.get("/", student_1.getStudentController);
router.post("/login", student_1.loginOrRegisterStudentController);
router.post("/refresh-token", student_1.refreshTokenController);
router.post("/logout", student_1.logoutStudentController);
router.get("/:id", student_1.getStudentById);
router.put("/:id", student_1.updateStudentController);
router.delete("/:id", student_1.deleteStudentController);
//# sourceMappingURL=student.route.js.map