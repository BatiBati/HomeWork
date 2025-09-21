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
exports.updateAssignment = void 0;
const assignment_models_1 = require("../../models/assignment.models");
const updateAssignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { lessons, dayCares, images, publicLinks } = req.body;
    console.log(id);
    try {
        const updatedAssignment = yield assignment_models_1.assignmentModel.findByIdAndUpdate(id, { lessons, dayCares, images, publicLinks }, { new: true });
        if (!updatedAssignment) {
            res.status(404).json({ message: "Assignment not found" });
            return;
        }
        res.status(200).json({
            message: "Assignment updated successfully",
            assignment: updatedAssignment,
        });
    }
    catch (error) {
        console.error("Update assignment error:", error);
        res.status(500).json({ message: "Update assignment server error" });
    }
});
exports.updateAssignment = updateAssignment;
//# sourceMappingURL=update-assignment.js.map