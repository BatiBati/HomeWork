"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayCareRouter = void 0;
const express_1 = require("express");
const dayCares_1 = require("../controllers/dayCares");
const router = (0, express_1.Router)();
exports.dayCareRouter = router;
router.post("/", dayCares_1.createDayCare);
router.get("/", dayCares_1.getDayCare);
router.patch("/:id", dayCares_1.updateDayCare);
//# sourceMappingURL=daycare.route.js.map