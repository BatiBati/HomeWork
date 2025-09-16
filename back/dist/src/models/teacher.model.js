"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherModel = void 0;
const mongoose_1 = require("mongoose");
const teacherSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    teacherName: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    school: { type: String, required: true },
    grade: { type: String, required: true },
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Student" }],
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Task" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.teacherModel = (0, mongoose_1.model)("Teacher", teacherSchema);
//# sourceMappingURL=teacher.model.js.map