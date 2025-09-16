"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeworkRouter = void 0;
const express_1 = require("express");
const homework_1 = require("../controllers/homework");
const auth_stud_middleware_1 = require("../middleware/auth.stud.middleware");
const router = (0, express_1.Router)();
exports.homeworkRouter = router;
// Protected routes (authentication required)
router.post("/", auth_stud_middleware_1.authenticateToken, homework_1.createHomeworkController);
router.get("/my", auth_stud_middleware_1.authenticateToken, homework_1.getMyHomeworksController);
router.get("/", auth_stud_middleware_1.optionalAuth, homework_1.getHomeworksController);
router.put("/:id", auth_stud_middleware_1.authenticateToken, homework_1.updateHomeworkController);
router.delete("/:id", auth_stud_middleware_1.authenticateToken, homework_1.deleteHomeworkController);
router.get("/:studentId", auth_stud_middleware_1.authenticateToken, homework_1.getHomeworkByStudentIdController);
//# sourceMappingURL=homework.route.js.map