"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const get_me_1 = require("../controllers/auth/get-me");
const login_1 = require("../controllers/auth/login");
const router = (0, express_1.Router)();
exports.getMeRouter = router;
router.get("/me", auth_middleware_1.authMiddleware, get_me_1.getMeUser);
router.post("/login", login_1.login);
//# sourceMappingURL=getMe.route.js.map