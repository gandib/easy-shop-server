import express from "express";
import { couponControllers } from "./coupon.controller";
import validateRequest from "../../middlewares/validateRequest";
import { couponValidations } from "./coupon.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  couponControllers.getAllCoupons
);

router.get("/:id", couponControllers.getCouponById);

router.post(
  "/",
  auth(UserRole.VENDOR),
  validateRequest(couponValidations.createCouponSchema),
  couponControllers.createCoupon
);

router.patch(
  "/:id",
  auth(UserRole.VENDOR),
  validateRequest(couponValidations.updateCouponSchema),
  couponControllers.updateCouponById
);

export const couponRoutes = router;
