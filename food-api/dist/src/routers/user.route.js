"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
exports.userRouter = (0, express_1.Router)()
    .get("/", user_1.getUserController)
    // .get("/:id", getUserController)
    .delete("/:id", user_1.deleteUserController)
    .post("/:id", user_1.createUserController)
    .patch("/:id", user_1.updateUserController)
    .put("/:id", user_1.updateUserController);
//# sourceMappingURL=user.route.js.map