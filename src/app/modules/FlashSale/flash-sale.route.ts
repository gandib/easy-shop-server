import express from "express";
import { flashSaleControllers } from "./flash-sale.controller";
import validateRequest from "../../middlewares/validateRequest";
import { flashSaleValidations } from "./flash-sale.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", flashSaleControllers.getAllFlashSales);

router.get("/:id", flashSaleControllers.getFlashSaleById);

router.post(
  "/",
  auth(UserRole.VENDOR),
  validateRequest(flashSaleValidations.createFlashSaleSchema),
  flashSaleControllers.createFlashSale
);

router.patch(
  "/:id",
  auth(UserRole.VENDOR),
  validateRequest(flashSaleValidations.updateFlashSaleSchema),
  flashSaleControllers.updateFlashSaleById
);

export const flashSaleRoutes = router;
