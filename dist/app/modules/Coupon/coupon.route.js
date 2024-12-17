"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const coupon_controller_1 = require("./coupon.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const coupon_validation_1 = require("./coupon.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), coupon_controller_1.couponControllers.getAllCoupons);
router.get("/:id", coupon_controller_1.couponControllers.getCouponById);
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR), (0, validateRequest_1.default)(coupon_validation_1.couponValidations.createCouponSchema), coupon_controller_1.couponControllers.createCoupon);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.VENDOR), (0, validateRequest_1.default)(coupon_validation_1.couponValidations.updateCouponSchema), coupon_controller_1.couponControllers.updateCouponById);
exports.couponRoutes = router;
