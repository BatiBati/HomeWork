"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
var Role;
(function (Role) {
    Role["Teacher"] = "teacher";
    Role["Parents"] = "parents";
})(Role || (Role = {}));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    daycareEmail: {
        type: String,
        required: false,
    },
    school: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        required: true,
        default: Role.Teacher,
    },
    children: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "children",
            required: false,
        },
    ],
}, { timestamps: true });
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=user.model.js.map