"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_todb_1 = require("../src/database/connect-todb");
const food_route_1 = require("../src/routers/food.route");
const category_route_1 = require("../src/routers/category.route");
const foodOrder_route_1 = require("../src/routers/foodOrder.route");
const user_route_1 = require("../src/routers/user.route");
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = require("../src/routers/auth.route");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
(0, connect_todb_1.connectToDataBase)();
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/about", (req, res) => {
    res.send("About");
});
app
    .use("/food", food_route_1.foodRouter)
    .use("/category", category_route_1.categoryRouter)
    .use("/foodOrder", foodOrder_route_1.foodOrder)
    .use("/user", user_route_1.userRouter)
    .use("/auth", auth_route_1.authRouter);
app.listen(port, () => {
    console.log(`Example app listening on port${port}`);
});
//# sourceMappingURL=index.js.map