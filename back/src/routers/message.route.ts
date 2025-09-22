import { Router } from "express";
import { getMessagesBetweenUsers, sendMessage } from "../controllers/message";
import { getMessagesForTeacher } from "../controllers/message/get-teacher-message";
import { getParentsForTeacher } from "../controllers/message/get-parents-for-teachet";

const router = Router();

router.get("/", getMessagesBetweenUsers);
router.post("/send", sendMessage);
router.get("/teacher", getMessagesForTeacher);
router.get("/parents", getParentsForTeacher);
export { router as messageRouter };
