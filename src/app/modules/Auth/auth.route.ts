import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/login",
  validateRequest(authValidations.loginSchema),
  authControllers.loginUser
);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  authControllers.changePassword
);

router.post("/forgot-password", authControllers.forgotPassword);

router.post("/reset-password", authControllers.resetPassword);

export const authRoutes = router;
