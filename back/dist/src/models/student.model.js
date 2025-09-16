"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentModel = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    parentname: { type: String, required: true },
    teacherId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Teacher", required: true },
    childname: { type: String, required: true },
    homeworks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Homework" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.studentModel = (0, mongoose_1.model)("Student", studentSchema);
//# sourceMappingURL=student.model.js.map