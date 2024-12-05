import express from "express";
import { followControllers } from "./follow.controller";
import validateRequest from "../../middlewares/validateRequest";
import { followValidations } from "./follow.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", followControllers.getAllFollows);

router.get(
  "/single-follow",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  followControllers.getFollowByUser
);

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(followValidations.createFollowSchema),
  followControllers.createFollow
);

router.patch(
  "/",
  auth(UserRole.USER),
  validateRequest(followValidations.createFollowSchema),
  followControllers.unFollowByUser
);

export const followRoutes = router;
