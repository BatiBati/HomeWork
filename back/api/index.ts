import express from "express";
import { connectToDataBase } from "../src/database/connect-todb";
import { userRouter } from "../src/routers/user.route";
import cors from "cors";
import { config } from "dotenv";
import { studentRouter } from "../src/routers/student.route";
import { homeworkRouter } from "../src/routers/homework.route";
import { teacherRouter } from "../src/routers/teacher.route";
// import { taskRouter } from "../src/routers/task.route";
import { childrenRouter } from "../src/routers/children.route";
import { messageRouter } from "../src/routers/message.route";
import { dayCareRouter } from "../src/routers/daycare.route";
import { assignmentRouter } from "../src/routers/assignment.route";

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
app.use("/daycare", dayCareRouter);
app.use("/message", messageRouter);
app.use("/assignment", assignmentRouter);
app.use("/student", studentRouter);
app.use("/homework", homeworkRouter);
app.use("/teacher", teacherRouter);
// app.use("/task", taskRouter);

app.listen(port, () => {
  console.log(`Example app listening on port${port}`);
});
