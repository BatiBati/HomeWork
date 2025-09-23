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
exports.getAssignmentsByTeacher = void 0;
const assignment_models_1 = require("../../models/assignment.models");
const getAssignmentsByTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find all assignments created by this teacher
        const assignments = yield assignment_models_1.assignmentModel
            .find({ teacher: id })
            .populate("teacher")
            .populate("childrens")
            .sort({ createdAt: -1 });
        res.status(200).json({
            assignments,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Fetch assignments server error" });
    }
});
exports.getAssignmentsByTeacher = getAssignmentsByTeacher;
//# sourceMappingURL=get-assingments-by-id.js.map