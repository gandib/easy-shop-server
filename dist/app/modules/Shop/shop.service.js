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
exports.shopServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const sendImageToCloudinary_1 = require("../../../utils/sendImageToCloudinary");
const createShop = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.name}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const path = file === null || file === void 0 ? void 0 : file.path;
        // send image to cloudinary
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        payload.logo = secure_url;
    }
    const result = yield prisma_1.default.shop.create({
        data: payload,
    });
    return result;
});
const getAllShops = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.findMany({
        where: {
        // isBlackListed: false,
        },
        include: {
            vendor: true,
            product: true,
            shopResponse: true,
            follow: true,
            coupon: true,
        },
    });
    return result;
});
const getShopById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            shop: true,
        },
    });
    const result = yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id: ((_a = user === null || user === void 0 ? void 0 : user.shop) === null || _a === void 0 ? void 0 : _a.id) ? (_b = user === null || user === void 0 ? void 0 : user.shop) === null || _b === void 0 ? void 0 : _b.id : id,
            isBlackListed: false,
        },
        include: {
            vendor: true,
            product: {
                include: {
                    category: true,
                },
            },
            shopResponse: true,
            follow: true,
            coupon: true,
        },
    });
    return result;
});
const updateShopById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.shop.findUniqueOrThrow({
        where: {
            id,
            isBlackListed: false,
        },
    });
    const result = yield prisma_1.default.shop.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const updateBlackListShopById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.shop.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.shopServices = {
    createShop,
    getAllShops,
    getShopById,
    updateShopById,
    updateBlackListShopById,
};
