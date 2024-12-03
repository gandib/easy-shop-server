import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), userControllers.getAllUsers);

router.get("/email", auth(UserRole.ADMIN), userControllers.getUserByEmail);

router.post(
  "/",
  validateRequest(userValidations.createUserSchema),
  userControllers.createUser
);

router.patch(
  "/email",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  validateRequest(userValidations.updateUserSchema),
  userControllers.updateUser
);

router.patch(
  "/status-change",
  auth(UserRole.ADMIN),
  validateRequest(userValidations.statusChangeSchema),
  userControllers.statusChange
);

export const userRoutes = router;
