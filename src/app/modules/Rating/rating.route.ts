import express from "express";
import { ratingControllers } from "./rating.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ratingValidations } from "./rating.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", ratingControllers.getAllRatings);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  ratingControllers.getRatingById
);

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(ratingValidations.createRatingSchema),
  ratingControllers.createRating
);

router.patch(
  "/:id",
  auth(UserRole.USER),
  validateRequest(ratingValidations.updateRatingSchema),
  ratingControllers.updateRatingById
);

export const ratingRoutes = router;
