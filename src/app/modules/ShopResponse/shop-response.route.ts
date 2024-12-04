import express from "express";
import { shopResponseControllers } from "./shop-response.controller";
import validateRequest from "../../middlewares/validateRequest";
import { shopResponseValidations } from "./shop-response.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", shopResponseControllers.getAllShopResponses);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.VENDOR),
  shopResponseControllers.getShopResponseById
);

router.post(
  "/",
  auth(UserRole.VENDOR),
  validateRequest(shopResponseValidations.createShopResponseSchema),
  shopResponseControllers.createShopResponse
);

router.patch(
  "/:id",
  auth(UserRole.VENDOR),
  validateRequest(shopResponseValidations.updateShopResponseSchema),
  shopResponseControllers.updateShopResponseById
);

export const shopResponseRoutes = router;
