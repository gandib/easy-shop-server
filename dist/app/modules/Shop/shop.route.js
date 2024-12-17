"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopRoutes = void 0;
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("./shop.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const shop_validation_1 = require("./shop.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const multer_config_1 = require("../../../config/multer.config");
const router = express_1.default.Router();
router.get("/", shop_controller_1.shopControllers.getAllShops);
router.get("/:id", 
// auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
shop_controller_1.shopControllers.getShopById);
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), multer_config_1.multerUpload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(shop_validation_1.shopValidations.createShopSchema), shop_controller_1.shopControllers.createshop);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), (0, validateRequest_1.default)(shop_validation_1.shopValidations.updateShopSchema), shop_controller_1.shopControllers.updateShopById);
router.patch("/black-list/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), (0, validateRequest_1.default)(shop_validation_1.shopValidations.updateBlackListShop), shop_controller_1.shopControllers.updateBlackListShopById);
exports.shopRoutes = router;
