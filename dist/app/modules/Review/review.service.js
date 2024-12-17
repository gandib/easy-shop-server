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
exports.reviewServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createReview = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const prodcutData = yield prisma_1.default.product.findUnique({
        where: {
            id: payload.productId,
        },
        include: {
            shop: true,
        },
    });
    const orderData = yield prisma_1.default.order.findMany({
        where: {
            AND: [
                {
                    userId: user === null || user === void 0 ? void 0 : user.id,
                    paymentStatus: "PAID",
                },
                {
                    orderItem: {
                        some: {
                            productId: payload.productId,
                        },
                    },
                },
            ],
        },
        include: {
            orderItem: true,
        },
    });
    if (((_b = (_a = orderData[0]) === null || _a === void 0 ? void 0 : _a.orderItem[0]) === null || _b === void 0 ? void 0 : _b.productId) !== payload.productId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Review not possible before purchase!");
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    payload.userId = userData === null || userData === void 0 ? void 0 : userData.id;
    payload.shopId = prodcutData === null || prodcutData === void 0 ? void 0 : prodcutData.shopId;
    // if(orderData?.find(order=> order?.orderItem))
    const result = yield prisma_1.default.review.create({
        data: payload,
        include: {
            product: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                },
            },
            shopResponse: true,
        },
    });
    return result;
});
const getAllReviews = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
        include: {
            shop: true,
        },
    });
    const andConditions = [];
    if ((user === null || user === void 0 ? void 0 : user.role) === "VENDOR") {
        andConditions.push({
            shopId: (_a = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.review.findMany({
        where: whereConditions,
        include: {
            product: {
                include: {
                    shop: true,
                },
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                },
            },
            shopResponse: true,
        },
    });
    return result;
});
const getReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            product: {
                include: {
                    shop: true,
                },
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                },
            },
            shopResponse: true,
        },
    });
    return result;
});
const updateReviewById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Review = yield prisma_1.default.review.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.review.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.reviewServices = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReviewById,
};
