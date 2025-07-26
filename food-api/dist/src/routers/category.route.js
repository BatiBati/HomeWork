"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_1 = require("../controllers/category");
exports.categoryRouter = (0, express_1.Router)()
    .get("/", category_1.getCategoryController)
    .get("/:id", category_1.getOneCategoryController)
    .delete("/:id", category_1.deleteOneCategoryController)
    .post("/", category_1.createCategoryController)
    .put("/:id", category_1.updateCategoryController);
//# sourceMappingURL=category.route.js.map