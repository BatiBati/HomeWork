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
    const { teacher, lessons, images, taskEndSchedule } = req.body;
    const childrens = yield children_models_1.childrenModel
        .find({ teacher: teacher })
        .populate("parents", "email daycareEmail")
        .select("_id parents firstName lastName grade school");
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
        });
        yield children_models_1.childrenModel.updateMany({ teacher: teacher }, { $push: { assignment: newAssignment._id } });
        // Get all unique parent emails and daycare emails
        const parentEmails = [];
        const daycareEmails = [];
        childrens.forEach((child) => {
            var _a, _b;
            if (child.parents &&
                typeof child.parents === "object" &&
                child.parents !== null) {
                const parentEmail = (_a = child.parents) === null || _a === void 0 ? void 0 : _a.email;
                if (parentEmail &&
                    typeof parentEmail === "string" &&
                    !parentEmails.includes(parentEmail)) {
                    parentEmails.push(parentEmail);
                }
                const daycareEmail = (_b = child.parents) === null || _b === void 0 ? void 0 : _b.daycareEmail;
                if (daycareEmail &&
                    typeof daycareEmail === "string" &&
                    !daycareEmails.includes(daycareEmail)) {
                    daycareEmails.push(daycareEmail);
                }
            }
        });
        // Send notifications to all parents and daycares (only once per assignment)
        if (parentEmails.length > 0 || daycareEmails.length > 0) {
            // Create a summary of all lessons for the notification
            const lessonSummary = newAssignment.lessons.map((lesson) => ({
                lessonName: lesson.lessonName,
                taskDescription: lesson.taskDescription,
            }));
            (0, mail_handler_1.sendHomeworkAddedNotification)(childrens
                .filter((c) => c.parents && typeof c.parents === "object" && c.parents !== null)
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
            }), lessonSummary, // Send lesson summary instead of individual lessons
            newAssignment);
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