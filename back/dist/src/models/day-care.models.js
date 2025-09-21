"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaycareModel = void 0;
const mongoose_1 = require("mongoose");
const daycareSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    children: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Student",
        },
    ],
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.DaycareModel = (0, mongoose_1.model)("Daycare", daycareSchema);
//# sourceMappingURL=day-care.models.js.map