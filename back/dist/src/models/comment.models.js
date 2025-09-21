"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    homework: {
        type: mongoose_1.Types.ObjectId,
        ref: "Homework",
        required: true,
    },
    sender: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.CommentModel = (0, mongoose_1.model)("Comment", commentSchema);
//# sourceMappingURL=comment.models.js.map