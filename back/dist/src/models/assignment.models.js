"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentModel = void 0;
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
    lessonName: { type: String, required: true },
    taskDescription: { type: String, required: true },
}, { _id: false });
const assignmentSchema = new mongoose_1.Schema({
    teacher: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    taskEndSchedule: {
        type: Date,
        required: true,
    },
    childrens: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "children",
            required: true,
        },
    ],
    lessons: [lessonSchema],
    images: [
        {
            type: String,
            required: false,
        },
    ],
    publicLinks: [
        {
            token: String,
            sharedBy: {
                type: String,
                enum: ["Teacher", "Parent"],
            },
            expireAt: Date,
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });
exports.assignmentModel = (0, mongoose_1.model)("Assignment", assignmentSchema);
//# sourceMappingURL=assignment.models.js.map