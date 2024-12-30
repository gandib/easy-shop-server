import express from "express";
import { newsletterControllers } from "./newsletter.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { newsletterValidations } from "./newsletter.validation";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), newsletterControllers.getAllNewsletters);

router.post(
  "/",
  validateRequest(newsletterValidations.createNewsletterSchema),
  newsletterControllers.createNewsletter
);

router.delete(
  "/:email",
  auth(UserRole.ADMIN),
  newsletterControllers.deleteNewsletterByEmail
);

export const newsletterRoutes = router;
