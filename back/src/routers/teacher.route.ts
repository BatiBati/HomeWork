import { Router } from "express";
import { createTeacher} from "../controllers/teacher/create-teacher";

export const teacherRouter = Router().post('/', createTeacher);