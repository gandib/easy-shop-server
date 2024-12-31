"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const category_route_1 = require("../modules/Category/category.route");
const shop_route_1 = require("../modules/Shop/shop.route");
const product_route_1 = require("../modules/Product/product.route");
const review_route_1 = require("../modules/Review/review.route");
const shop_response_route_1 = require("../modules/ShopResponse/shop-response.route");
const rating_route_1 = require("../modules/Rating/rating.route");
const coupon_route_1 = require("../modules/Coupon/coupon.route");
const flash_sale_route_1 = require("../modules/FlashSale/flash-sale.route");
const follow_route_1 = require("../modules/Follow/follow.route");
const order_route_1 = require("../modules/Order/order.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const newsletter_route_1 = require("../modules/Newsletter/newsletter.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/category",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/shop",
        route: shop_route_1.shopRoutes,
    },
    {
        path: "/product",
        route: product_route_1.productRoutes,
    },
    {
        path: "/review",
        route: review_route_1.reviewRoutes,
    },
    {
        path: "/shop-response",
        route: shop_response_route_1.shopResponseRoutes,
    },
    {
        path: "/rating",
        route: rating_route_1.ratingRoutes,
    },
    {
        path: "/coupon",
        route: coupon_route_1.couponRoutes,
    },
    {
        path: "/flash-sale",
        route: flash_sale_route_1.flashSaleRoutes,
    },
    {
        path: "/follow",
        route: follow_route_1.followRoutes,
    },
    {
        path: "/order",
        route: order_route_1.orderRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoutes,
    },
    {
        path: "/newsletter",
        route: newsletter_route_1.newsletterRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
