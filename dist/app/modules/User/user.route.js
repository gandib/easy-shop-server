"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userControllers.getAllUsers);
router.get("/email", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER), user_controller_1.userControllers.getUserByEmail);
router.post("/", (0, validateRequest_1.default)(user_validation_1.userValidations.createUserSchema), user_controller_1.userControllers.createUser);
router.patch("/email", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER), (0, validateRequest_1.default)(user_validation_1.userValidations.updateUserSchema), user_controller_1.userControllers.updateUser);
router.patch("/status-change", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(user_validation_1.userValidations.statusChangeSchema), user_controller_1.userControllers.statusChange);
exports.userRoutes = router;
