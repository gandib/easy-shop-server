import express, { NextFunction, Request, Response } from "express";
import { categoryControllers } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidations } from "./category.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { multerUpload } from "../../../config/multer.config";

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
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(categoryValidations.createCategorySchema),
  categoryControllers.createCategory
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN),
  validateRequest(categoryValidations.updateCategorySchema),
  categoryControllers.updateCategoryById
);

export const categoryRoutes = router;
