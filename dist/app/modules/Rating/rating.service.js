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
exports.ratingServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createRating = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        include: {
            rating: true,
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
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    if (((_b = (_a = orderData[0]) === null || _a === void 0 ? void 0 : _a.orderItem[0]) === null || _b === void 0 ? void 0 : _b.productId) !== payload.productId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Rating not possible before purchase!");
    }
    payload.userId = userData === null || userData === void 0 ? void 0 : userData.id;
    payload.shopId = prodcutData === null || prodcutData === void 0 ? void 0 : prodcutData.shopId;
    let result;
    if ((_c = userData === null || userData === void 0 ? void 0 : userData.rating) === null || _c === void 0 ? void 0 : _c.find((rate) => (rate === null || rate === void 0 ? void 0 : rate.productId) === payload.productId)) {
        const rating = yield prisma_1.default.rating.findUnique({
            where: {
                id: (_d = userData === null || userData === void 0 ? void 0 : userData.rating) === null || _d === void 0 ? void 0 : _d.filter((rate) => (rate === null || rate === void 0 ? void 0 : rate.productId) === payload.productId)[0].id,
            },
        });
        result = yield prisma_1.default.rating.update({
            where: {
                id: rating === null || rating === void 0 ? void 0 : rating.id,
            },
            data: {
                rating: payload.rating,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        status: true,
                    },
                },
                product: true,
            },
        });
    }
    else {
        result = yield prisma_1.default.rating.create({
            data: payload,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        status: true,
                    },
                },
                product: true,
            },
        });
    }
    return result;
});
const getAllRatings = (user) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma_1.default.rating.findMany({
        where: whereConditions,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                },
            },
            product: true,
        },
    });
    return result;
});
const getRatingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.rating.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                },
            },
            product: true,
        },
    });
    return result;
});
const updateRatingById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Rating = yield prisma_1.default.rating.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.rating.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.ratingServices = {
    createRating,
    getAllRatings,
    getRatingById,
    updateRatingById,
};
