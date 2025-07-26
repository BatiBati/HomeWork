import express from "express";

import { connectToDataBase } from "../src/database/connect-todb";

import { foodRouter } from "../src/routers/food.route";
import { categoryRouter } from "../src/routers/category.route";
import { foodOrder } from "../src/routers/foodOrder.route";
import { userRouter } from "../src/routers/user.route";
import cors from "cors";
import { authRouter } from "../src/routers/auth.route";
import { config } from "dotenv";

config();

connectToDataBase();

const app = express();

const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://localhost:3000",
      "https://food-web-sigma-six.vercel.app/",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app
  .use("/food", foodRouter)
  .use("/category", categoryRouter)
  .use("/foodOrder", foodOrder)
  .use("/user", userRouter)
  .use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port${port}`);
});
