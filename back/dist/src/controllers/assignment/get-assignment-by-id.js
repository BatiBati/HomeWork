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
exports.getAssignmentById = void 0;
const assignment_models_1 = require("../../models/assignment.models");
const getAssignmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const assignment = yield assignment_models_1.assignmentModel.findById(id).populate("teacher");
        res.status(200).json({
            assignment,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Fetch assignment server error" });
    }
});
exports.getAssignmentById = getAssignmentById;
//# sourceMappingURL=get-assignment-by-id.js.map