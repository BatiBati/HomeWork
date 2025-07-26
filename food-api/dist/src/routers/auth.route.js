"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authentication_middleware_1 = require("../controllers/middlewares/authentication-middleware");
exports.authRouter = (0, express_1.Router)()
    .get("/me", authentication_middleware_1.authenticationMiddleware, auth_1.getMe)
    .post("/sign-up", auth_1.signUp)
    .post("/sign-in", auth_1.signIn);
//# sourceMappingURL=auth.route.js.map