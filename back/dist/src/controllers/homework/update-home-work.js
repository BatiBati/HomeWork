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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomeworkById = void 0;
const homework_models_1 = require("../../models/homework.models");
const mongoose_1 = __importDefault(require("mongoose"));
// PUT /homework/:id
const updateHomeworkById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid homework ID" });
        return;
    }
    try {
        const homework = yield homework_models_1.homeworkModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!homework) {
            res.status(404).json({ message: "Homework not found" });
            return;
        }
        // populate separately
        const populatedHomework = yield homework.populate("studentId");
        res.json({ message: "Homework updated", homework: populatedHomework });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateHomeworkById = updateHomeworkById;
//# sourceMappingURL=update-home-work.js.map