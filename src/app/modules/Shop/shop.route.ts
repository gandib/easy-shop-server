import express, { NextFunction, Request, Response } from "express";
import { shopControllers } from "./shop.controller";
import validateRequest from "../../middlewares/validateRequest";
import { shopValidations } from "./shop.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { multerUpload } from "../../../config/multer.config";

const router = express.Router();

router.get("/", shopControllers.getAllShops);

router.get(
  "/:id",
  // auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
  shopControllers.getShopById
);

router.post(
  "/",
  auth(UserRole.VENDOR),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(shopValidations.createShopSchema),
  shopControllers.createshop
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  validateRequest(shopValidations.updateShopSchema),
  shopControllers.updateShopById
);

router.patch(
  "/black-list/:id",
  auth(UserRole.ADMIN),
  validateRequest(shopValidations.updateBlackListShop),
  shopControllers.updateBlackListShopById
);

export const shopRoutes = router;
