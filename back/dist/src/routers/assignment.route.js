"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentRouter = void 0;
const express_1 = require("express");
const assignment_1 = require("../controllers/assignment");
const get_assingments_by_id_1 = require("../controllers/assignment/get-assingments-by-id");
exports.assignmentRouter = (0, express_1.Router)()
    .post("/", assignment_1.createAssignment)
    .get("/", assignment_1.getAssignments)
    .patch("/:id", assignment_1.updateAssignment)
    .get("/get/:id", get_assingments_by_id_1.getAssignmentsByTeacher)
    .get("/byId/:id", assignment_1.getAssignmentById)
    .get("/get/:teacherId", get_assingments_by_id_1.getAssignmentsByTeacher);
//# sourceMappingURL=assignment.route.js.map