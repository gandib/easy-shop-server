"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", category_controller_1.categoryControllers.getAllCategories);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER), category_controller_1.categoryControllers.getCategoryById);
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(category_validation_1.categoryValidations.createCategorySchema), category_controller_1.categoryControllers.createCategory);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(category_validation_1.categoryValidations.updateCategorySchema), category_controller_1.categoryControllers.updateCategoryById);
exports.categoryRoutes = router;
