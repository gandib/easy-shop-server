import express from "express";
import { reviewControllers } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidations } from "./review.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", reviewControllers.getAllReviews);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  reviewControllers.getReviewById
);

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(reviewValidations.createReviewSchema),
  reviewControllers.createReview
);

router.patch(
  "/:id",
  auth(UserRole.USER),
  validateRequest(reviewValidations.updateReviewSchema),
  reviewControllers.updateReviewById
);

export const reviewRoutes = router;
