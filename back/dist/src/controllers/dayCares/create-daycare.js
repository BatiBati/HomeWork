"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDayCare = void 0;
const day_care_models_1 = require("../../models/day-care.models");
const children_models_1 = require("../../models/children.models");
const createDayCare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, children } = req.body;
    const foundChildren = yield children_models_1.childrenModel.findById(children);
    if (!children) {
        res.status(404).json({ message: `Children with ${children} not found ` });
        return;
    }
    try {
        const dayCare = yield day_care_models_1.DaycareModel.create({
            email: email,
            children: [foundChildren],
        });
        res.status(201).json({
            message: "DayCare created successfully",
            dayCare: dayCare,
        });
    }
    catch (error) {
        console.error("Create dayCare error:", error);
        res.status(500).json({ message: "Create dayCare server error" });
    }
});
exports.createDayCare = createDayCare;
//# sourceMappingURL=create-daycare.js.map