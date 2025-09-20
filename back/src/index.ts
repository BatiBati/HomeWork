import express from "express";
import { connectToDataBase } from "../src/database/connect-todb";
import { userRouter } from "../src/routers/user.route";
import cors from "cors";
import { config } from "dotenv";
import { studentRouter } from "./routers/student.route";
import { homeworkRouter } from "./routers/homework.route";
import { teacherRouter } from "./routers/teacher.route";
import { taskRouter } from "./routers/task.route";
import { childrenRouter } from "./routers/children.route";

config();

connectToDataBase();

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Back end");
});
app.use("/user", userRouter);
app.use("/children", childrenRouter);
app.use("/student", studentRouter);
app.use("/homework", homeworkRouter);
app.use("/teacher", teacherRouter);
app.use("/task", taskRouter);

app.listen(port, () => {
  console.log(`Example app listening on port${port}`);
});
