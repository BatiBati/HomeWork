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
exports.updateDayCare = void 0;
const day_care_models_1 = require("../../models/day-care.models");
const updateDayCare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, childrenId } = req.body;
    try {
        const updateDayCare = yield day_care_models_1.DaycareModel.findByIdAndUpdate(id, {
            email: email,
            $addToSet: { children: childrenId },
        }, { new: true });
        if (!updateDayCare) {
            res.status(404).json({ message: "Daycare not found" });
            return;
        }
        res.status(200).json({
            message: "Daycare updated successfully",
            daycare: updateDayCare,
        });
    }
    catch (error) {
        console.error("Update dayCare error:", error);
        res.status(500).json({ message: "Update dayCare server error" });
    }
});
exports.updateDayCare = updateDayCare;
//# sourceMappingURL=update-daycare.js.map