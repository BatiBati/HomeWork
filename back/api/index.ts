import express from "express";
import { connectToDataBase } from "../src/database/connect-todb";
import { userRouter } from "../src/routers/user.route";
import cors from "cors";
import { config } from "dotenv";
import { childrenRouter } from "../src/routers/children.route";
import { messageRouter } from "../src/routers/message.route";
import { assignmentRouter } from "../src/routers/assignment.route";
import { getMeRouter } from "../src/routers/getMe.route";

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
app.use("/auth", getMeRouter);
app.use("/children", childrenRouter);
app.use("/assignment", assignmentRouter);
app.use("/message", messageRouter);

app.listen(port, () => {
  console.log(`Example app listening on port${port}`);
});
