"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodRouter = void 0;
const express_1 = require("express");
const food_1 = require("../controllers/food");
exports.foodRouter = (0, express_1.Router)()
    .get("/", food_1.getFoodController)
    // .get("/:id", getOneFoodController)
    .delete("/:id", food_1.deleteOneFoodController)
    .post("/", food_1.createFoodController)
    .put("/:id", food_1.updateFoodController)
    .get("/count", food_1.countFoodsCategory);
//# sourceMappingURL=food.route.js.map