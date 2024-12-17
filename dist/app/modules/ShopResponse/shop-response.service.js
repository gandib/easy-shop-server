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
exports.shopResponseServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createShopResponse = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
    const reviewData = yield prisma_1.default.review.findUnique({
        where: {
            id: payload === null || payload === void 0 ? void 0 : payload.reviewId,
        },
        include: {
            product: true,
        },
    });
    if (((_a = reviewData === null || reviewData === void 0 ? void 0 : reviewData.product) === null || _a === void 0 ? void 0 : _a.shopId) !== ((_b = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _b === void 0 ? void 0 : _b.id)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Review not found!");
    }
    payload.shopId = (_c = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _c === void 0 ? void 0 : _c.id;
    const result = yield prisma_1.default.shopResponse.create({
        data: payload,
        include: {
            review: true,
            shop: true,
        },
    });
    return result;
});
const getAllShopResponses = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shopResponse.findMany({
        include: {
            review: true,
            shop: true,
        },
    });
    return result;
});
const getShopResponseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shopResponse.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            review: true,
            shop: true,
        },
    });
    return result;
});
const updateShopResponseById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const ShopResponse = yield prisma_1.default.shopResponse.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.shopResponse.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.shopResponseServices = {
    createShopResponse,
    getAllShopResponses,
    getShopResponseById,
    updateShopResponseById,
};
