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
exports.getDayCare = void 0;
const day_care_models_1 = require("../../models/day-care.models");
const getDayCare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dayCare = yield day_care_models_1.DaycareModel.find({});
        res.status(201).json({
            message: "DayCare fetched successfully",
            dayCare: dayCare,
        });
    }
    catch (error) {
        console.error("Fetch dayCare error:", error);
        res.status(500).json({ message: "Fetch dayCare server error" });
    }
});
exports.getDayCare = getDayCare;
//# sourceMappingURL=get-dayCare.js.map