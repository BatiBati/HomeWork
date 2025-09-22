import { Router } from "express";
import { getMessagesBetweenUsers, sendMessage } from "../controllers/message";

const router = Router();

router.get("/", getMessagesBetweenUsers);
router.post("/send", sendMessage);

export { router as messageRouter };
