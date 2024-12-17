"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const multer_config_1 = require("../../../config/multer.config");
const router = express_1.default.Router();
router.get("/", product_controller_1.productControllers.getAllProducts);
router.get("/by-follower", (0, auth_1.default)(client_1.UserRole.USER), product_controller_1.productControllers.getAllProductsByFollowedUser);
router.get("/all-products-by-shop", (0, auth_1.default)(client_1.UserRole.VENDOR), product_controller_1.productControllers.getAllProductsByShopId);
router.get("/:id", 
// auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.USER),
product_controller_1.productControllers.getProductById);
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), multer_config_1.multerUpload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(product_validation_1.productValidations.createProductSchema), product_controller_1.productControllers.createProduct);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), (0, validateRequest_1.default)(product_validation_1.productValidations.updateProductSchema), product_controller_1.productControllers.updateProductById);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), product_controller_1.productControllers.deleteProductById);
exports.productRoutes = router;
