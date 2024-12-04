import express, { NextFunction, Request, Response } from "express";
import { productControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productValidations } from "./product.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../../utils/upload";

const router = express.Router();

router.get("/", productControllers.getAllProducts);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  productControllers.getProductById
);

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(productValidations.createProductSchema),
  productControllers.createProduct
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  validateRequest(productValidations.updateProductSchema),
  productControllers.updateProductById
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  productControllers.deleteProductById
);

export const productRoutes = router;
