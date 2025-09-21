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
        const newChild = yield children_models_1.childrenModel.create({
            firstName,
            lastName,
            profilePicture,
            teacher: teacher,
            parents: parent._id,
            grade: teacher._id,
            school: teacher._id,
        });
        console.log(newChild.teacher);
        if (!parent.children)
            parent.children = [];
        parent.children.push(newChild._id);
        yield parent.save();
        if (!teacher.children)
            teacher.children = [];
        teacher.children.push(newChild._id);
        yield teacher.save();
        res.status(201).json({
            message: "Child created successfully",
            child: newChild,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Create Student server error" });
    }
});
exports.createChildren = createChildren;
//# sourceMappingURL=create-children.js.map