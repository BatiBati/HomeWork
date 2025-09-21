"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = require("express");
const message_1 = require("../controllers/message");
const router = (0, express_1.Router)();
exports.messageRouter = router;
router.get("/", message_1.getMessagesBetweenUsers);
router.post("/", message_1.sendMessage);
//# sourceMappingURL=message.route.js.map