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
exports.sendMessage = void 0;
const message_models_1 = require("../../models/message.models");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId, content } = req.body;
    try {
        const newMessage = yield message_models_1.messageModel.create({
            sender: senderId,
            receiver: receiverId,
            content,
        });
        res.status(201).json({ message: "Message sent", newMessage });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.sendMessage = sendMessage;
//# sourceMappingURL=send-message.js.map