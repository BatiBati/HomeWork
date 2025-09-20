import { Router } from "express";
import {
  createDayCare,
  getDayCare,
  updateDayCare,
} from "../controllers/dayCares";

const router = Router();
router.post("/", createDayCare);
router.get("/", getDayCare);
router.patch("/:id", updateDayCare);

export { router as dayCareRouter };
