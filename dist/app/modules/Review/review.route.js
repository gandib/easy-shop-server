"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_validation_1 = require("./review.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER), review_controller_1.reviewControllers.getAllReviews);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER), review_controller_1.reviewControllers.getReviewById);
router.post("/", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(review_validation_1.reviewValidations.createReviewSchema), review_controller_1.reviewControllers.createReview);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(review_validation_1.reviewValidations.updateReviewSchema), review_controller_1.reviewControllers.updateReviewById);
exports.reviewRoutes = router;
