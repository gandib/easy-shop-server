import express from "express";
import { paymentControllers } from "./payment.controller";

const router = express.Router();

router.post("/initiate", paymentControllers.initiatePayment);
router.post("/confirmation", paymentControllers.paymentConfirmation);

export const paymentRoutes = router;
