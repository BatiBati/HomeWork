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
exports.updateTeacher = void 0;
const teacher_model_1 = require("../../models/teacher.model");
const updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedTeacher = yield teacher_model_1.teacherModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!updatedTeacher) {
            res.status(404).json({ message: "Teacher олдсонгүй" });
            return;
        }
        res.status(200).json(updatedTeacher);
    }
    catch (error) {
        console.error("❌ Update teacher error:", error);
        res.status(500).json({ message: "Teacher шинэчлэхэд алдаа гарлаа" });
    }
});
exports.updateTeacher = updateTeacher;
//# sourceMappingURL=update-techer.js.map