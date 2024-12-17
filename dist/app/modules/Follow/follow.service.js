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
exports.followServices = void 0;
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const createFollow = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: "ACTIVE",
        },
    });
    payload.userId = userData === null || userData === void 0 ? void 0 : userData.id;
    const result = yield prisma_1.default.follow.create({
        data: payload,
    });
    return result;
});
const getAllFollows = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.follow.findMany({
        include: {
            shop: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                },
            },
        },
    });
    return result;
});
const getFollowByUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: "ACTIVE",
        },
        include: {
            follow: true,
        },
    });
    const shopId = userData.follow.filter((user) => user.userId === userData.id)[0].shopId;
    const result = yield prisma_1.default.follow.findUniqueOrThrow({
        where: {
            userId_shopId: {
                userId: userData === null || userData === void 0 ? void 0 : userData.id,
                shopId,
            },
        },
        include: {
            shop: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                },
            },
        },
    });
    return result;
});
const unFollowByUser = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: "ACTIVE",
        },
        include: {
            follow: true,
        },
    });
    const follow = yield prisma_1.default.follow.findUniqueOrThrow({
        where: {
            userId_shopId: {
                userId: userData === null || userData === void 0 ? void 0 : userData.id,
                shopId: payload.shopId,
            },
        },
    });
    const result = yield prisma_1.default.follow.delete({
        where: {
            userId_shopId: {
                userId: userData === null || userData === void 0 ? void 0 : userData.id,
                shopId: payload.shopId,
            },
        },
    });
    return result;
});
exports.followServices = {
    createFollow,
    getAllFollows,
    getFollowByUser,
    unFollowByUser,
};
