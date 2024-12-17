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
exports.flashSaleServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createFlashSale = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        include: {
            shop: true,
        },
    });
    const productData = yield prisma_1.default.product.findUnique({
        where: {
            id: payload === null || payload === void 0 ? void 0 : payload.productId,
        },
    });
    if (((_a = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _a === void 0 ? void 0 : _a.id) !== (productData === null || productData === void 0 ? void 0 : productData.shopId)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "You are not authorised to create flash sale for another shop's product!");
    }
    const result = yield prisma_1.default.flashSale.create({
        data: payload,
        include: {
            product: true,
        },
    });
    return result;
});
const getAllFlashSales = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
        include: {
            shop: {
                include: {
                    product: true,
                },
            },
        },
    });
    const productIds = (_b = (_a = userData === null || userData === void 0 ? void 0 : userData.shop) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.map((prod) => prod.id);
    const result = yield prisma_1.default.flashSale.findMany({
        where: {
            productId: { in: productIds },
        },
        include: {
            product: true,
        },
    });
    return result;
});
const getFlashSaleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.flashSale.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            product: true,
        },
    });
    return result;
});
const updateFlashSaleById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const FlashSale = yield prisma_1.default.flashSale.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prisma_1.default.flashSale.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.flashSaleServices = {
    createFlashSale,
    getAllFlashSales,
    getFlashSaleById,
    updateFlashSaleById,
};
