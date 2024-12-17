"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCoupon = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        include: {
            shop: true,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    payload.shopId = (_a = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield prisma_1.default.coupon.create({
        data: payload,
        include: {
            shop: true,
        },
    });
    return result;
});
const getAllCoupons = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            shop: true,
        },
    });
    const result = yield prisma_1.default.coupon.findMany({
        where: {
            shopId: (_a = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _a === void 0 ? void 0 : _a.id,
        },
        include: {
            shop: true,
        },
    });
    return result;
});
const getCouponById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.coupon.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            shop: true,
        },
    });
    return result;
});
const updateCouponById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Coupon = yield prisma_1.default.coupon.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.coupon.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.couponServices = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCouponById,
};
