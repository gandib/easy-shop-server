import express from "express";
import { orderControllers } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidations } from "./order.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", orderControllers.getAllOrders);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  orderControllers.getOrderById
);

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(orderValidations.createOrderSchema),
  orderControllers.createOrder
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  orderControllers.updateOrderById
);

export const orderRoutes = router;
