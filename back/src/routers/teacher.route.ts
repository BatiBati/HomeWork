import { Router } from "express";
import { createTeacher } from "../controllers/teacher";

export const teacherRouter = Router().post('/', createTeacher)