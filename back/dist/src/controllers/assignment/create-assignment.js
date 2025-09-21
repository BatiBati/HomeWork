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
exports.createAssignment = void 0;
const assignment_models_1 = require("../../models/assignment.models");
const children_models_1 = require("../../models/children.models");
const mail_handler_1 = require("../../utils/mail-handler");
const createAssignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacher, lessons, images, publicLinks, taskEndSchedule } = req.body;
    const childrens = yield children_models_1.childrenModel
        .find({ teacher: teacher })
        .populate("parents", "email daycareEmail")
        .select("_id parents firstName lastName");
    if (!childrens.length) {
        res.status(404).json({ message: "Teacher has no children" });
        return;
    }
    try {
        const newAssignment = yield assignment_models_1.assignmentModel.create({
            teacher,
            childrens: childrens.map((c) => c._id),
            lessons,
            taskEndSchedule: new Date(taskEndSchedule),
            images,
            publicLinks,
        });
        yield children_models_1.childrenModel.updateMany({ teacher: teacher }, { $push: { assignment: newAssignment._id } });
        // Get all unique parent emails and daycare emails
        const parentEmails = [];
        const daycareEmails = [];
        childrens.forEach((child) => {
            if (child.parents && child.parents.email) {
                const parentEmail = child.parents.email;
                if (!parentEmails.includes(parentEmail)) {
                    parentEmails.push(parentEmail);
                }
                const daycareEmail = child.parents.daycareEmail;
                if (daycareEmail && !daycareEmails.includes(daycareEmail)) {
                    daycareEmails.push(daycareEmail);
                }
            }
        });
        console.log("📧 All parent emails:", parentEmails);
        console.log("📧 All daycare emails:", daycareEmails);
        // Send notifications to all parents and daycares
        if (parentEmails.length > 0 || daycareEmails.length > 0) {
            (0, mail_handler_1.sendHomeworkAddedNotification)(childrens.map((c) => ({
                firstName: c.firstName,
                lastName: c.lastName,
                parents: [
                    {
                        email: c.parents.email,
                        daycareEmail: c.parents.daycareEmail || "",
                    },
                ],
            })), newAssignment.lessons, newAssignment.taskEndSchedule.toISOString());
        }
        res.status(201).json({
            message: "Assignment created successfully",
            assignment: newAssignment,
        });
    }
    catch (error) {
        console.error("Create assignment error:", error);
        res.status(500).json({
            message: "Create assignment server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createAssignment = createAssignment;
//# sourceMappingURL=create-assignment.js.map