"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const message_1 = require("../controllers/message");
const get_teacher_message_1 = require("../controllers/message/get-teacher-message");
const get_parents_for_teachet_1 = require("../controllers/message/get-parents-for-teachet");
const router = (0, express_1.Router)();
exports.messageRouter = router;
router.get("/", message_1.getMessagesBetweenUsers);
router.post("/send", message_1.sendMessage);
router.get("/teacher", get_teacher_message_1.getMessagesForTeacher);
router.get("/parents", get_parents_for_teachet_1.getParentsForTeacher);
//# sourceMappingURL=message.route.js.map