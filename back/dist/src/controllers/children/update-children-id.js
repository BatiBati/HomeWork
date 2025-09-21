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
exports.updateChildrenById = void 0;
const children_models_1 = require("../../models/children.models");
const updateChildrenById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstName, lastName, profilePicture, parents, grade, school } = req.body;
    console.log("Children Id", id);
    try {
        if (!id) {
            res.status(400).json({ message: `Child id not provided` });
            return;
        }
        const updatedChild = yield children_models_1.childrenModel.findByIdAndUpdate(id, { firstName, lastName, profilePicture, parents, grade, school }, { new: true });
        if (!updatedChild) {
            res.status(404).json({ message: `Child not found with id ${id}` });
            return;
        }
        res.status(200).json({
            message: "Child updated successfully",
            child: updatedChild,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while updating child",
            error: error.message,
        });
    }
});
exports.updateChildrenById = updateChildrenById;
//# sourceMappingURL=update-children-id.js.map