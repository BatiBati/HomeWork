"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModel = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    lessonName: {
        type: String,
        required: true,
    },
    image: [
        {
            type: String,
            required: true,
        },
    ],
    taskEndSchedule: {
        type: Date,
        required: true,
    },
    homeworks: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Homework",
        },
    ],
    teacherId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.taskModel = (0, mongoose_1.model)("Task", taskSchema);
//# sourceMappingURL=task.model.js.map