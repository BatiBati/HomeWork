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
exports.createChildren = void 0;
const children_models_1 = require("../../models/children.models");
const user_model_1 = require("../../models/user.model");
const createChildren = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { firstName, lastName, profilePicture, parentId, teacherId } = req.body;
    console.log("Teacher Id", teacherId);
    console.log("Parent Id", parentId);
    try {
        const parent = yield user_model_1.userModel.findById(parentId);
        if (!parent) {
            res.status(404).json({ message: `Parent with ${parentId}:id not found` });
            return;
        }
        if (parent.role !== "parents") {
            res.status(400).json({ message: "User is not a parent" });
            return;
        }
        const teacher = yield user_model_1.userModel.findById(teacherId);
        console.log(teacher);
        if (!teacher) {
            res.status(404).json({ message: "Teacher not found" });
            return;
        }
        if (teacher.role !== "teacher") {
            res.status(400).json({ message: "User is not a teacher" });
            return;
        }
        // Ensure teacher has school and grade so child inherits them
        if (!teacher.school || !teacher.grade) {
            res.status(400).json({
                message: "Teacher is missing school or grade",
                details: {
                    teacherId,
                    school: (_a = teacher.school) !== null && _a !== void 0 ? _a : null,
                    grade: (_b = teacher.grade) !== null && _b !== void 0 ? _b : null,
                },
            });
            return;
        }
        const newChild = yield children_models_1.childrenModel.create({
            firstName,
            lastName,
            profilePicture,
            teacher: teacher,
            parents: parent._id,
            grade: teacher.grade,
            school: teacher.school,
        });
        console.log(newChild.teacher);
        // Avoid triggering full user validation; push child IDs atomically
        yield user_model_1.userModel.updateOne({ _id: parent._id }, { $push: { children: newChild._id } });
        yield user_model_1.userModel.updateOne({ _id: teacher._id }, { $push: { children: newChild._id } });
        res.status(201).json({
            message: "Child created successfully",
            child: newChild,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Create Student server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.createChildren = createChildren;
//# sourceMappingURL=create-children.js.map