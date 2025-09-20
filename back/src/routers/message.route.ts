import { Router } from "express";
import { getMessagesBetweenUsers, sendMessage } from "../controllers/message";

const router = Router();

router.get("/", getMessagesBetweenUsers);
router.post("/", sendMessage);

export { router as messageRouter };
