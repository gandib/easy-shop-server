import express from "express";
import { categoryControllers } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidations } from "./category.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", categoryControllers.getAllCategories);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  categoryControllers.getCategoryById
);

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(categoryValidations.createCategorySchema),
  categoryControllers.createCategory
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(categoryValidations.updateCategorySchema),
  categoryControllers.updateCategoryById
);

// router.del(
//   "/status-change",
//   auth(UserRole.ADMIN),
//   validateRequest(userValidations.statusChangeSchema),
//   userControllers.statusChange
// );

export const categoryRoutes = router;
