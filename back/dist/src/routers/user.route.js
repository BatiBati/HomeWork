"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const create_user_1 = require("../controllers/user/create-user");
const update_user_1 = require("../controllers/user/update-user");
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.userRouter = (0, express_1.Router)()
    .post("/", create_user_1.createUserController)
    .get("/", auth_middleware_1.authMiddleware, user_1.getAllUsersController)
    .get("/:id", user_1.getUserById)
    .post("/email", auth_middleware_1.authMiddleware, user_1.getUserByEmail)
    .patch("/:id", auth_middleware_1.authMiddleware, update_user_1.updateUserById);
//# sourceMappingURL=user.route.js.map