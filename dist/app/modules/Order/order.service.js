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
exports.orderServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const createOrder = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const productData = yield prisma_1.default.product.findUniqueOrThrow({
        where: {
            id: payload.orderItems[0].productId,
        },
        include: {
            shop: true,
        },
    });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createOrder = yield transactionClient.order.create({
            data: {
                shopId: productData === null || productData === void 0 ? void 0 : productData.shopId,
                userId: userData === null || userData === void 0 ? void 0 : userData.id,
                totalPrice: payload.totalPrice,
            },
            include: {
                orderItem: true,
            },
        });
        for (let index = 0; index < payload.orderItems.length; index++) {
            const orderItem = payload.orderItems[index];
            const createOrderItem = yield transactionClient.orderItem.create({
                data: {
                    orderId: createOrder.id,
                    productId: orderItem.productId,
                    quantity: orderItem.quantity,
                },
            });
            const productData = yield transactionClient.product.findUniqueOrThrow({
                where: {
                    id: orderItem.productId,
                },
            });
            const decreaseProductQuantity = yield transactionClient.product.update({
                where: {
                    id: orderItem.productId,
                },
                data: {
                    quantity: (productData === null || productData === void 0 ? void 0 : productData.quantity) - orderItem.quantity,
                },
            });
        }
        return createOrder;
    }));
    return result;
});
const getAllOrders = (options, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.id,
        },
        include: {
            shop: true,
        },
    });
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (user.role === "VENDOR") {
        andConditions.push({
            shopId: (_a = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _a === void 0 ? void 0 : _a.id,
        });
    }
    if (user.role === "USER") {
        andConditions.push({
            userId: userData === null || userData === void 0 ? void 0 : userData.id,
        });
    }
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.order.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
        include: {
            orderItem: {
                include: {
                    product: true,
                },
            },
            payment: true,
        },
    });
    const total = yield prisma_1.default.order.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data: result,
    };
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            orderItem: true,
            payment: true,
        },
    });
    return result;
});
const updateOrderById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Order = yield prisma_1.default.order.findUniqueOrThrow({
        where: {
            id,
            paymentStatus: "UNPAID",
        },
    });
    const result = yield prisma_1.default.order.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.orderServices = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
};
