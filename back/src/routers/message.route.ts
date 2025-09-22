import { Router } from "express";
import { getMessagesBetweenUsers, sendMessage } from "../controllers/message";
import { getMessagesForTeacher } from "../controllers/message/get-teacher-message";

const router = Router();

router.get("/", getMessagesBetweenUsers);
router.post("/send", sendMessage);
router.get("/teacher", getMessagesForTeacher);

export { router as messageRouter };
