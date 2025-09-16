"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const create_task_1 = require("../controllers/task/create-task");
const router = (0, express_1.Router)();
exports.taskRouter = router;
router.post("/create", create_task_1.createTaskController);
//# sourceMappingURL=task.route.js.map