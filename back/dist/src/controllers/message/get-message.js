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
exports.getMessagesBetweenUsers = void 0;
const message_models_1 = require("../../models/message.models");
const getMessagesBetweenUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user1Id, user2Id } = req.query;
    try {
        const messages = yield message_models_1.messageModel
            .find({
            $or: [
                { sender: user1Id, receiver: user2Id },
                { sender: user2Id, receiver: user1Id },
            ],
        })
            .sort({ createdAt: 1 });
        res.status(200).json({ messages });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getMessagesBetweenUsers = getMessagesBetweenUsers;
//# sourceMappingURL=get-message.js.map