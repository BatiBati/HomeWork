"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodOrder = void 0;
const express_1 = require("express");
const foodOrder_1 = require("../controllers/foodOrder");
const getOneFoodOrderController_1 = require("../controllers/foodOrder/getOneFoodOrderController");
exports.foodOrder = (0, express_1.Router)()
    .get("/", foodOrder_1.getFoodOrderController)
    .get("/:id", getOneFoodOrderController_1.getOneFoodOrderController)
    .delete("/:id", foodOrder_1.deleteFoodOrderController)
    .post("/post", foodOrder_1.createFoodOrderController)
    .patch("/:id", foodOrder_1.updateFoodOrderController)
    .put("/:id", foodOrder_1.updateFoodOrderController);
//# sourceMappingURL=foodOrder.route.js.map