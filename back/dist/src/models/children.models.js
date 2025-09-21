"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.childrenModel = void 0;
const mongoose_1 = require("mongoose");
const childrenSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    teacher: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    parents: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    grade: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    school: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    assignment: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Assignment",
        },
    ],
}, { timestamps: true });
exports.childrenModel = (0, mongoose_1.model)("children", childrenSchema);
//# sourceMappingURL=children.models.js.map