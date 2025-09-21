"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.childrenRouter = void 0;
const express_1 = require("express");
const children_1 = require("../controllers/children");
exports.childrenRouter = (0, express_1.Router)()
    .post("/", children_1.createChildren)
    .get("/", children_1.getChildrens)
    .get("/:id", children_1.getChildrens)
    .patch("/:id", children_1.updateChildrenById);
//# sourceMappingURL=children.route.js.map