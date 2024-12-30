import express from "express";
import { userRoutes } from "../modules/User/user.route";
import { authRoutes } from "../modules/Auth/auth.route";
import { categoryRoutes } from "../modules/Category/category.route";
import { shopRoutes } from "../modules/Shop/shop.route";
import { productRoutes } from "../modules/Product/product.route";
import { reviewRoutes } from "../modules/Review/review.route";
import { shopResponseRoutes } from "../modules/ShopResponse/shop-response.route";
import { ratingRoutes } from "../modules/Rating/rating.route";
import { couponRoutes } from "../modules/Coupon/coupon.route";
import { flashSaleRoutes } from "../modules/FlashSale/flash-sale.route";
import { followRoutes } from "../modules/Follow/follow.route";
import { orderRoutes } from "../modules/Order/order.route";
import { paymentRoutes } from "../modules/Payment/payment.route";
import { newsletterRoutes } from "../modules/Newsletter/newsletter.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/shop",
    route: shopRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/review",
    route: reviewRoutes,
  },
  {
    path: "/shop-response",
    route: shopResponseRoutes,
  },
  {
    path: "/rating",
    route: ratingRoutes,
  },
  {
    path: "/coupon",
    route: couponRoutes,
  },
  {
    path: "/flash-sale",
    route: flashSaleRoutes,
  },
  {
    path: "/follow",
    route: followRoutes,
  },
  {
    path: "/order",
    route: orderRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/newsletter",
    route: newsletterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
