import express from "express";
import { connectToDataBase } from "../src/database/connect-todb";
import { userRouter } from "../src/routers/user.route";
import cors from "cors";
import { config } from "dotenv";

config();

connectToDataBase();

const app = express();

const port = 3001;

app.use(express.json());
app.use(
  cors()
);

app.get("/", (req, res) => {
  res.send("Back end");
});
app.use("/user", userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port${port}`);
});
