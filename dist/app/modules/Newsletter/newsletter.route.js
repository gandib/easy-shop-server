"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const newsletter_controller_1 = require("./newsletter.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const newsletter_validation_1 = require("./newsletter.validation");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), newsletter_controller_1.newsletterControllers.getAllNewsletters);
router.post("/", (0, validateRequest_1.default)(newsletter_validation_1.newsletterValidations.createNewsletterSchema), newsletter_controller_1.newsletterControllers.createNewsletter);
router.delete("/:email", (0, auth_1.default)(client_1.UserRole.ADMIN), newsletter_controller_1.newsletterControllers.deleteNewsletterByEmail);
exports.newsletterRoutes = router;
