"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_todb_1 = require("../src/database/connect-todb");
const user_route_1 = require("../src/routers/user.route");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const student_route_1 = require("../src/routers/student.route");
const homework_route_1 = require("../src/routers/homework.route");
const teacher_route_1 = require("../src/routers/teacher.route");
// import { taskRouter } from "../src/routers/task.route";
const children_route_1 = require("../src/routers/children.route");
const message_route_1 = require("../src/routers/message.route");
const daycare_route_1 = require("../src/routers/daycare.route");
const assignment_route_1 = require("../src/routers/assignment.route");
const getMe_route_1 = require("../src/routers/getMe.route");
(0, dotenv_1.config)();
(0, connect_todb_1.connectToDataBase)();
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Back end");
});
app.use("/user", user_route_1.userRouter);
app.use("/auth", getMe_route_1.getMeRouter);
app.use("/children", children_route_1.childrenRouter);
app.use("/daycare", daycare_route_1.dayCareRouter);
app.use("/assignment", assignment_route_1.assignmentRouter);
app.use("/message", message_route_1.messageRouter);
app.use("/student", student_route_1.studentRouter);
app.use("/homework", homework_route_1.homeworkRouter);
app.use("/teacher", teacher_route_1.teacherRouter);
// app.use("/task", taskRouter);
app.listen(port, () => {
    console.log(`Example app listening on port${port}`);
});
//# sourceMappingURL=index.js.map