"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=user.model.js.map