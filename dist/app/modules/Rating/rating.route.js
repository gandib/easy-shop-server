"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const rating_controller_1 = require("./rating.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rating_validation_1 = require("./rating.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER), rating_controller_1.ratingControllers.getAllRatings);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER), rating_controller_1.ratingControllers.getRatingById);
router.post("/", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(rating_validation_1.ratingValidations.createRatingSchema), rating_controller_1.ratingControllers.createRating);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(rating_validation_1.ratingValidations.updateRatingSchema), rating_controller_1.ratingControllers.updateRatingById);
exports.ratingRoutes = router;
