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
exports.getParentsForTeacher = void 0;
const message_models_1 = require("../../models/message.models");
const getParentsForTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.query;
    if (!teacherId || typeof teacherId !== "string") {
        res.status(400).json({ message: "teacherId is required" });
        return;
    }
    try {
        // find all messages where teacher is sender or receiver
        const messages = yield message_models_1.messageModel
            .find({
            $or: [{ sender: teacherId }, { receiver: teacherId }],
        })
            .populate("sender receiver", "_id firstName lastName role");
        const parentMap = new Map();
        messages.forEach((msg) => {
            // pick only the parent (not teacher)
            const parent = msg.sender.role === "parents"
                ? msg.sender
                : msg.receiver.role === "parents"
                    ? msg.receiver
                    : null;
            if (parent && parent._id !== teacherId) {
                parentMap.set(parent._id, {
                    _id: parent._id,
                    firstName: parent.firstName,
                    lastName: parent.lastName,
                });
            }
        });
        res.json({ parents: Array.from(parentMap.values()) });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getParentsForTeacher = getParentsForTeacher;
//# sourceMappingURL=get-parents-for-teachet.js.map