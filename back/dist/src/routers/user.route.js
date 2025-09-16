"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const create_user_1 = require("../controllers/user/create-user");
exports.userRouter = (0, express_1.Router)()
    .post("/", create_user_1.createUserController)
    .get("/", user_1.getAllUsersController);
//# sourceMappingURL=user.route.js.map