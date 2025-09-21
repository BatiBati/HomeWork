"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentRouter = void 0;
const express_1 = require("express");
const assignment_1 = require("../controllers/assignment");
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.assignmentRouter = (0, express_1.Router)()
    .post("/", auth_middleware_1.authMiddleware, assignment_1.createAssignment)
    .get("/", auth_middleware_1.authMiddleware, assignment_1.getAssignments)
    .patch("/:id", auth_middleware_1.authMiddleware, assignment_1.updateAssignment);
//# sourceMappingURL=assignment.route.js.map