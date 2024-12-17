"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flashSaleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flash_sale_controller_1 = require("./flash-sale.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const flash_sale_validation_1 = require("./flash-sale.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), flash_sale_controller_1.flashSaleControllers.getAllFlashSales);
router.get("/:id", flash_sale_controller_1.flashSaleControllers.getFlashSaleById);
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), (0, validateRequest_1.default)(flash_sale_validation_1.flashSaleValidations.createFlashSaleSchema), flash_sale_controller_1.flashSaleControllers.createFlashSale);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.VENDOR), (0, validateRequest_1.default)(flash_sale_validation_1.flashSaleValidations.updateFlashSaleSchema), flash_sale_controller_1.flashSaleControllers.updateFlashSaleById);
exports.flashSaleRoutes = router;
