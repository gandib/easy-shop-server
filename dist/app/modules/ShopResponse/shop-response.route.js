"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopResponseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const shop_response_controller_1 = require("./shop-response.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const shop_response_validation_1 = require("./shop-response.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", shop_response_controller_1.shopResponseControllers.getAllShopResponses);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), shop_response_controller_1.shopResponseControllers.getShopResponseById);
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), (0, validateRequest_1.default)(shop_response_validation_1.shopResponseValidations.createShopResponseSchema), shop_response_controller_1.shopResponseControllers.createShopResponse);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.VENDOR), (0, validateRequest_1.default)(shop_response_validation_1.shopResponseValidations.updateShopResponseSchema), shop_response_controller_1.shopResponseControllers.updateShopResponseById);
exports.shopResponseRoutes = router;
