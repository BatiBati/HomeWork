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
const children_models_1 = require("../../models/children.models");
const edit_mail_1 = require("../../utils/edit.mail");
const updateAssignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { lessons, dayCares, images, publicLinks, taskEndSchedule } = req.body;
    try {
        const update = { lessons, dayCares, images, publicLinks };
        if (taskEndSchedule) {
            update.taskEndSchedule = new Date(taskEndSchedule);
        }
        const updatedAssignment = yield assignment_models_1.assignmentModel.findByIdAndUpdate(id, update, { new: true });
        if (!updatedAssignment) {
            res.status(404).json({ message: "Assignment not found" });
            return;
        }
        // Fetch children under this assignment's teacher to notify
        const childrens = yield children_models_1.childrenModel
            .find({ teacher: updatedAssignment.teacher })
            .populate("parents", "email daycareEmail")
            .select("_id parents firstName lastName grade school");
        if (childrens.length) {
            const lessonSummary = (updatedAssignment.lessons || []).map((l) => ({
                lessonName: l.lessonName,
                taskDescription: l.taskDescription,
            }));
            yield (0, edit_mail_1.sendHomeworkEditedNotification)(childrens
                .filter((c) => c.parents && typeof c.parents === "object")
                .map((c) => {
                var _a, _b;
                return ({
                    firstName: c.firstName,
                    lastName: c.lastName,
                    parents: [
                        {
                            email: ((_a = c.parents) === null || _a === void 0 ? void 0 : _a.email) || "",
                            daycareEmail: ((_b = c.parents) === null || _b === void 0 ? void 0 : _b.daycareEmail) || "",
                        },
                    ],
                    grade: c.grade,
                    school: c.school,
                });
            }), lessonSummary, updatedAssignment);
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