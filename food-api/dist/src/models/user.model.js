"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        required: false,
    },
    orderedFoods: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "foodOrder",
        required: false,
    },
    ttl: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        required: false,
    },
    createdAt: {
        type: Date,
        required: false,
    },
    updatedAt: {
        type: Date,
        required: false,
    },
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=user.model.js.map